import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Initialize Gemini API
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

// Initialize the Gemini API client
export function initializeGemini() {
  if (!API_KEY) {
    console.warn('Gemini API key not configured');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    return false;
  }
}

// Check if Gemini is configured
export function isGeminiConfigured(): boolean {
  return !!API_KEY && API_KEY.length > 0;
}

// AI Employee Types with specialized prompts
export enum AIEmployeeType {
  DEVELOPER = 'developer',
  DESIGNER = 'designer',
  MARKETER = 'marketer',
  WRITER = 'writer',
  ANALYST = 'analyst',
  SUPPORT = 'support',
}

// System prompts for each AI employee type
const SYSTEM_PROMPTS: Record<AIEmployeeType, string> = {
  [AIEmployeeType.DEVELOPER]: `You are an expert software developer AI assistant. You have deep knowledge of:
- Modern web technologies (React, TypeScript, Node.js, Python)
- Software architecture and design patterns
- Code optimization and best practices
- Debugging and problem-solving
- DevOps and deployment strategies

Provide clear, concise, and actionable technical advice. When writing code, always explain your approach and include comments.`,

  [AIEmployeeType.DESIGNER]: `You are a creative UI/UX designer AI assistant. You specialize in:
- User interface design principles
- User experience optimization
- Visual hierarchy and typography
- Color theory and branding
- Accessibility and inclusive design

Provide design recommendations that are practical, modern, and user-centered. Consider both aesthetics and functionality.`,

  [AIEmployeeType.MARKETER]: `You are a strategic marketing AI assistant. Your expertise includes:
- Digital marketing strategies
- Content marketing and SEO
- Social media campaigns
- Brand positioning and messaging
- Analytics and conversion optimization

Provide data-driven marketing insights and creative campaign ideas. Focus on measurable outcomes and ROI.`,

  [AIEmployeeType.WRITER]: `You are a professional content writer AI assistant. You excel at:
- Creative and technical writing
- Content strategy and planning
- Copywriting and storytelling
- Editing and proofreading
- SEO-optimized content creation

Write engaging, clear, and purposeful content tailored to the target audience. Adapt your tone and style as needed.`,

  [AIEmployeeType.ANALYST]: `You are a data analyst AI assistant. You specialize in:
- Data analysis and interpretation
- Statistical methods and modeling
- Data visualization and reporting
- Business intelligence and insights
- Predictive analytics

Provide data-driven insights with clear explanations. Use examples and visualizations when helpful.`,

  [AIEmployeeType.SUPPORT]: `You are a customer support AI assistant. You are skilled at:
- Resolving customer issues efficiently
- Clear and empathetic communication
- Product knowledge and troubleshooting
- De-escalation and conflict resolution
- Proactive problem prevention

Provide helpful, friendly, and professional support. Prioritize customer satisfaction and clear communication.`,
};

// Chat with an AI employee
export async function chatWithAIEmployee(
  employeeType: AIEmployeeType,
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'model'; parts: string }> = []
): Promise<string> {
  if (!model) {
    if (!initializeGemini()) {
      throw new Error('Gemini API is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }
  }

  try {
    const systemPrompt = SYSTEM_PROMPTS[employeeType];

    // Start a chat session with history
    const chat = model!.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will act as your ' + employeeType + ' assistant. How can I help you today?' }],
        },
        ...conversationHistory.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.parts }],
        })),
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error chatting with AI employee:', error);
    throw new Error('Failed to get response from AI employee');
  }
}

// Analyze a document
export async function analyzeDocument(
  documentText: string,
  analysisType: 'summary' | 'insights' | 'recommendations' | 'qa' = 'summary'
): Promise<string> {
  if (!model) {
    if (!initializeGemini()) {
      throw new Error('Gemini API is not configured');
    }
  }

  const prompts = {
    summary: `Please provide a concise summary of the following document. Focus on the key points and main takeaways:\n\n${documentText}`,
    insights: `Analyze the following document and provide key insights, patterns, and important findings:\n\n${documentText}`,
    recommendations: `Based on the following document, provide actionable recommendations and next steps:\n\n${documentText}`,
    qa: `Read the following document carefully. After reading, you will answer questions about it:\n\n${documentText}`,
  };

  try {
    const result = await model!.generateContent(prompts[analysisType]);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw new Error('Failed to analyze document');
  }
}

// Generate code based on requirements
export async function generateCode(
  language: string,
  requirements: string,
  context?: string
): Promise<string> {
  if (!model) {
    if (!initializeGemini()) {
      throw new Error('Gemini API is not configured');
    }
  }

  const prompt = `Generate ${language} code based on the following requirements:

Requirements:
${requirements}

${context ? `Additional Context:\n${context}\n` : ''}

Please provide:
1. Clean, well-commented code
2. Brief explanation of the approach
3. Any important considerations or best practices

Code:`;

  try {
    const result = await model!.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating code:', error);
    throw new Error('Failed to generate code');
  }
}

// Intent classification for routing
export async function classifyIntent(userMessage: string): Promise<AIEmployeeType> {
  if (!model) {
    if (!initializeGemini()) {
      // Default to support if Gemini is not configured
      return AIEmployeeType.SUPPORT;
    }
  }

  const prompt = `Classify the following user message into ONE of these categories:
- developer (technical/coding questions, software development, debugging)
- designer (UI/UX, visual design, branding, user experience)
- marketer (marketing strategy, campaigns, SEO, social media)
- writer (content creation, copywriting, documentation, editing)
- analyst (data analysis, statistics, reporting, insights)
- support (customer service, troubleshooting, general inquiries)

User message: "${userMessage}"

Respond with ONLY the category name, nothing else.`;

  try {
    const result = await model!.generateContent(prompt);
    const response = result.response.text().trim().toLowerCase();

    // Map response to AIEmployeeType
    const typeMap: Record<string, AIEmployeeType> = {
      developer: AIEmployeeType.DEVELOPER,
      designer: AIEmployeeType.DESIGNER,
      marketer: AIEmployeeType.MARKETER,
      writer: AIEmployeeType.WRITER,
      analyst: AIEmployeeType.ANALYST,
      support: AIEmployeeType.SUPPORT,
    };

    return typeMap[response] || AIEmployeeType.SUPPORT;
  } catch (error) {
    console.error('Error classifying intent:', error);
    return AIEmployeeType.SUPPORT; // Default fallback
  }
}

// Stream responses for real-time chat
export async function* streamChatResponse(
  employeeType: AIEmployeeType,
  userMessage: string
): AsyncGenerator<string, void, unknown> {
  if (!model) {
    if (!initializeGemini()) {
      throw new Error('Gemini API is not configured');
    }
  }

  const systemPrompt = SYSTEM_PROMPTS[employeeType];
  const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;

  try {
    const result = await model!.generateContentStream(fullPrompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      yield chunkText;
    }
  } catch (error) {
    console.error('Error streaming chat response:', error);
    throw new Error('Failed to stream response');
  }
}

export default {
  initializeGemini,
  isGeminiConfigured,
  chatWithAIEmployee,
  analyzeDocument,
  generateCode,
  classifyIntent,
  streamChatResponse,
  AIEmployeeType,
};
