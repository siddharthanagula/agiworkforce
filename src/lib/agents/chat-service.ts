import { supabase } from '@/lib/supabase';
import { routeToAgent, type AgentRequest } from './router';
import type { ChatMessage } from '@/types';

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
 * Create a new chat session
 */
export async function createChatSession(params: CreateChatSessionParams): Promise<string> {
  const { userId, employeeId } = params;

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: userId,
      employee_id: employeeId,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to create chat session: ${error.message}`);
  }

  return data.id;
}

/**
 * Get chat session by ID
 */
export async function getChatSession(sessionId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error) {
    throw new Error(`Failed to get chat session: ${error.message}`);
  }

  return data;
}

/**
 * Get all messages for a chat session
 */
export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('timestamp', { ascending: true });

  if (error) {
    throw new Error(`Failed to get chat messages: ${error.message}`);
  }

  return data.map((msg) => ({
    id: msg.id,
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
    timestamp: new Date(msg.timestamp),
    employeeId: msg.employee_id,
  }));
}

/**
 * Send a message and get AI response
 */
export async function sendMessage(params: SendMessageParams): Promise<ChatMessage> {
  const { sessionId, employeeId, employeeRole, content } = params;

  // Save user message to database
  const { error: userMessageError } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role: 'user',
      content,
    })
    .select()
    .single();

  if (userMessageError) {
    throw new Error(`Failed to save user message: ${userMessageError.message}`);
  }

  // Get AI response using Agentuity-style routing
  const agentRequest: AgentRequest = {
    prompt: content,
    employeeId,
    employeeRole,
    sessionId,
  };

  const aiResponse = await routeToAgent(agentRequest);

  // Save AI response to database
  const { data: assistantMessage, error: assistantMessageError } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse.content,
    })
    .select()
    .single();

  if (assistantMessageError) {
    throw new Error(`Failed to save assistant message: ${assistantMessageError.message}`);
  }

  return {
    id: assistantMessage.id,
    role: 'assistant',
    content: aiResponse.content,
    timestamp: new Date(assistantMessage.timestamp),
    employeeId,
  };
}

/**
 * Get user's chat sessions
 */
export async function getUserChatSessions(userId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select(`
      *,
      ai_employees (
        id,
        name,
        role,
        provider
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get user chat sessions: ${error.message}`);
  }

  return data;
}

/**
 * Delete a chat session
 */
export async function deleteChatSession(sessionId: string) {
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', sessionId);

  if (error) {
    throw new Error(`Failed to delete chat session: ${error.message}`);
  }
}
