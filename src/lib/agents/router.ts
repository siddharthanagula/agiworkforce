import { createAnthropic } from '@ai-sdk/anthropic';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';

// Initialize Anthropic client with API key from environment
const anthropic = createAnthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY || '',
});

export interface AgentRequest {
  prompt: string;
  employeeId?: string;
  employeeRole?: string;
  sessionId?: string;
}

export interface AgentResponse {
  content: string;
  agentType: string;
  metadata?: Record<string, any>;
}

// Define available agent types based on AI employees
const agentTypeSchema = z.enum([
  'SoftwareEngineer',
  'DataScientist',
  'MarketingManager',
  'CustomerSupport',
  'DevOpsEngineer',
  'ContentWriter',
  'SecurityEngineer',
]);

export type AgentType = z.infer<typeof agentTypeSchema>;

/**
 * Router agent that determines which specialized agent should handle the request
 */
export async function routeToAgent(request: AgentRequest): Promise<AgentResponse> {
  const { prompt, employeeRole } = request;

  // If employee role is specified, directly route to that agent
  if (employeeRole) {
    const agentType = mapRoleToAgentType(employeeRole);
    return await executeAgent(agentType, prompt);
  }

  // Otherwise, determine the best agent based on user intent
  const userIntent = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: `
      You serve as a central hub that routes user requests to the right
      AI agent based on the user's intent. Classify the user's intent
      and select the best agent to handle it.

      Available agents:
      - SoftwareEngineer: Code development, debugging, architecture, technical implementation
      - DataScientist: Data analysis, ML models, statistics, insights generation
      - MarketingManager: Marketing campaigns, SEO, content strategy, social media
      - CustomerSupport: Customer service, problem-solving, support tickets
      - DevOpsEngineer: Infrastructure, deployment, CI/CD, cloud services
      - ContentWriter: Writing, documentation, blog posts, creative content
      - SecurityEngineer: Security audits, vulnerability assessment, compliance
    `,
    schema: z.object({
      agentType: agentTypeSchema,
      reasoning: z.string(),
    }),
    prompt,
  });

  const agentType = userIntent.object.agentType;
  return await executeAgent(agentType, prompt);
}

/**
 * Execute the appropriate specialized agent
 */
async function executeAgent(agentType: AgentType, prompt: string): Promise<AgentResponse> {
  const systemPrompt = getSystemPromptForAgent(agentType);

  const response = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: systemPrompt,
    prompt,
  });

  return {
    content: response.text,
    agentType,
    metadata: {
      usage: response.usage,
      finishReason: response.finishReason,
    },
  };
}

/**
 * Map employee role to agent type
 */
function mapRoleToAgentType(role: string): AgentType {
  const roleMap: Record<string, AgentType> = {
    'Software Engineer': 'SoftwareEngineer',
    'Data Scientist': 'DataScientist',
    'Marketing Manager': 'MarketingManager',
    'Customer Support': 'CustomerSupport',
    'DevOps Engineer': 'DevOpsEngineer',
    'Content Writer': 'ContentWriter',
    'Security Engineer': 'SecurityEngineer',
  };

  return roleMap[role] || 'SoftwareEngineer';
}

/**
 * Get specialized system prompt for each agent type
 */
function getSystemPromptForAgent(agentType: AgentType): string {
  const prompts: Record<AgentType, string> = {
    SoftwareEngineer: `
      You are an expert Software Engineer AI assistant with deep knowledge of:
      - Full-stack development (React, Node.js, TypeScript, Python)
      - System architecture and design patterns
      - Code review and best practices
      - Database design and optimization
      - API development (REST, GraphQL)

      Provide clear, production-ready code solutions with explanations.
      Focus on maintainability, performance, and scalability.
    `,
    DataScientist: `
      You are an expert Data Scientist AI assistant specialized in:
      - Data analysis and statistical modeling
      - Machine learning and deep learning
      - Python (pandas, numpy, scikit-learn, TensorFlow, PyTorch)
      - Data visualization and insights generation
      - Predictive modeling and feature engineering

      Provide data-driven insights with clear explanations and code examples.
    `,
    MarketingManager: `
      You are an expert Marketing Manager AI assistant with expertise in:
      - Digital marketing strategy
      - SEO and content optimization
      - Social media marketing
      - Campaign planning and execution
      - Analytics and performance tracking

      Provide creative, data-driven marketing recommendations and strategies.
    `,
    CustomerSupport: `
      You are an expert Customer Support AI assistant focused on:
      - Empathetic and professional communication
      - Problem-solving and troubleshooting
      - Product knowledge and guidance
      - Conflict resolution
      - Customer satisfaction

      Provide helpful, friendly support with clear step-by-step solutions.
    `,
    DevOpsEngineer: `
      You are an expert DevOps Engineer AI assistant specialized in:
      - Cloud infrastructure (AWS, Azure, GCP)
      - CI/CD pipelines and automation
      - Containerization (Docker, Kubernetes)
      - Infrastructure as Code (Terraform, CloudFormation)
      - Monitoring and logging

      Provide reliable, scalable infrastructure solutions with best practices.
    `,
    ContentWriter: `
      You are an expert Content Writer AI assistant skilled in:
      - Creative and technical writing
      - Blog posts and articles
      - Documentation and guides
      - SEO-optimized content
      - Editing and proofreading

      Provide engaging, well-structured content that resonates with the audience.
    `,
    SecurityEngineer: `
      You are an expert Security Engineer AI assistant with expertise in:
      - Security audits and vulnerability assessment
      - Penetration testing methodologies
      - Compliance and risk assessment (OWASP, NIST, ISO 27001)
      - Secure coding practices
      - Incident response and threat detection

      Provide thorough security analysis with actionable recommendations.
      IMPORTANT: Only assist with defensive security tasks. Do not provide guidance
      for malicious activities or offensive security without proper authorization.
    `,
  };

  return prompts[agentType];
}
