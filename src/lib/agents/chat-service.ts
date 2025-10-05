import { routeToAgent, type AgentRequest } from './router';
import { sendMessageToGemini } from './gemini-service';
import type { ChatMessage } from '@/types';

// Helper functions for local storage
function getChatSessionsFromStorage(): Record<string, any> {
  try {
    const sessions = localStorage.getItem('chat_sessions');
    return sessions ? JSON.parse(sessions) : {};
  } catch {
    return {};
  }
}

function getChatMessagesFromStorage(): Record<string, ChatMessage[]> {
  try {
    const messages = localStorage.getItem('chat_messages');
    return messages ? JSON.parse(messages) : {};
  } catch {
    return {};
  }
}

function saveChatMessagesToStorage(messages: Record<string, ChatMessage[]>): void {
  localStorage.setItem('chat_messages', JSON.stringify(messages));
}

export interface CreateChatSessionParams {
  userId: string;
  employeeId: string;
}

export interface SendMessageParams {
  sessionId: string;
  userId: string;
  employeeId: string;
  employeeRole: string;
  content: string;
}

/**
 * Create a new chat session using local storage
 */
export async function createChatSession(params: CreateChatSessionParams): Promise<string> {
  const { userId, employeeId } = params;
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session = {
    id: sessionId,
    userId,
    employeeId,
    createdAt: new Date().toISOString(),
  };
  
  // Store in local storage
  const sessions = getChatSessionsFromStorage();
  sessions[sessionId] = session;
  localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  
  return sessionId;
}

/**
 * Get chat session by ID from local storage
 */
export async function getChatSession(sessionId: string) {
  const sessions = getChatSessionsFromStorage();
  const session = sessions[sessionId];
  
  if (!session) {
    throw new Error(`Chat session not found: ${sessionId}`);
  }
  
  return session;
}

/**
 * Get all messages for a chat session from local storage
 */
export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  const allMessages = getChatMessagesFromStorage();
  return allMessages[sessionId] || [];
}

/**
 * Send a message and get AI response using local storage
 */
export async function sendMessage(params: SendMessageParams): Promise<ChatMessage> {
  const { sessionId, employeeId, employeeRole, content } = params;

  // Get AI response using Gemini API (primary) or fallback to Claude routing
  let aiResponseContent: string;

  try {
    // Try Gemini API first (for hackathon requirement)
    aiResponseContent = await sendMessageToGemini(content, employeeRole);
  } catch (geminiError) {
    console.warn('Gemini API failed, falling back to Claude:', geminiError);
    // Fallback to Agentuity-style routing with Claude
    const agentRequest: AgentRequest = {
      prompt: content,
      employeeId,
      employeeRole,
      sessionId,
    };
    const aiResponse = await routeToAgent(agentRequest);
    aiResponseContent = aiResponse.content;
  }

  // Create user message
  const userMessage: ChatMessage = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    role: 'user',
    content,
    timestamp: new Date(),
    employeeId,
  };

  // Create assistant message
  const assistantMessage: ChatMessage = {
    id: `assistant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    role: 'assistant',
    content: aiResponseContent,
    timestamp: new Date(),
    employeeId,
  };

  // Save both messages to local storage
  const allMessages = getChatMessagesFromStorage();
  if (!allMessages[sessionId]) {
    allMessages[sessionId] = [];
  }
  allMessages[sessionId].push(userMessage, assistantMessage);
  saveChatMessagesToStorage(allMessages);

  return assistantMessage;
}

/**
 * Get user's chat sessions from local storage
 */
export async function getUserChatSessions(userId: string) {
  const sessions = getChatSessionsFromStorage();
  return Object.values(sessions).filter((session: any) => session.userId === userId);
}

/**
 * Delete a chat session from local storage
 */
export async function deleteChatSession(sessionId: string) {
  const sessions = getChatSessionsFromStorage();
  delete sessions[sessionId];
  localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  
  // Also delete associated messages
  const allMessages = getChatMessagesFromStorage();
  delete allMessages[sessionId];
  saveChatMessagesToStorage(allMessages);
}
