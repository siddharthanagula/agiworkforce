/**
 * Agentuity Service
 *
 * This service integrates with Agentuity's AI agent orchestration platform
 * for intelligent routing, multi-agent collaboration, and production deployment
 */

import { AIEmployeeType, classifyIntent } from './gemini';

// Agentuity configuration
const API_KEY = (import.meta as any).env?.VITE_AGENTUITY_API_KEY || '';

// Check if Agentuity is configured
export function isAgentuityConfigured(): boolean {
  return !!API_KEY && API_KEY.length > 0;
}

// Agent definition interface
export interface AgentDefinition {
  id: string;
  name: string;
  type: AIEmployeeType;
  description: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training';
  performance: {
    tasksCompleted: number;
    averageResponseTime: number;
    successRate: number;
  };
}

// Agent task interface
export interface AgentTask {
  taskId: string;
  agentType: AIEmployeeType;
  userMessage: string;
  context?: Record<string, any>;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  createdAt: Date;
  completedAt?: Date;
}

// In-memory store for demo purposes
// In production, this would be managed by Agentuity's cloud infrastructure
class AgentRegistry {
  private agents: Map<string, AgentDefinition> = new Map();
  private tasks: Map<string, AgentTask> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    const agentTypes = Object.values(AIEmployeeType);

    agentTypes.forEach((type, index) => {
      const agent: AgentDefinition = {
        id: `agent-${type}-${Date.now()}-${index}`,
        name: this.getAgentName(type),
        type,
        description: this.getAgentDescription(type),
        capabilities: this.getAgentCapabilities(type),
        status: 'active',
        performance: {
          tasksCompleted: Math.floor(Math.random() * 100),
          averageResponseTime: Math.random() * 2 + 0.5,
          successRate: 0.85 + Math.random() * 0.15,
        },
      };

      this.agents.set(agent.id, agent);
    });
  }

  private getAgentName(type: AIEmployeeType): string {
    const names: Record<AIEmployeeType, string> = {
      [AIEmployeeType.DEVELOPER]: 'DevBot 3000',
      [AIEmployeeType.DESIGNER]: 'DesignMaster AI',
      [AIEmployeeType.MARKETER]: 'MarketGuru',
      [AIEmployeeType.WRITER]: 'ContentCraft AI',
      [AIEmployeeType.ANALYST]: 'DataWise',
      [AIEmployeeType.SUPPORT]: 'SupportHero',
    };
    return names[type];
  }

  private getAgentDescription(type: AIEmployeeType): string {
    const descriptions: Record<AIEmployeeType, string> = {
      [AIEmployeeType.DEVELOPER]: 'Expert software development and code generation',
      [AIEmployeeType.DESIGNER]: 'Creative UI/UX design and branding specialist',
      [AIEmployeeType.MARKETER]: 'Strategic marketing and campaign optimization',
      [AIEmployeeType.WRITER]: 'Professional content creation and copywriting',
      [AIEmployeeType.ANALYST]: 'Data analysis and business intelligence',
      [AIEmployeeType.SUPPORT]: 'Customer support and issue resolution',
    };
    return descriptions[type];
  }

  private getAgentCapabilities(type: AIEmployeeType): string[] {
    const capabilities: Record<AIEmployeeType, string[]> = {
      [AIEmployeeType.DEVELOPER]: [
        'Code generation',
        'Bug fixing',
        'Architecture design',
        'Code review',
        'Technical documentation',
      ],
      [AIEmployeeType.DESIGNER]: [
        'UI/UX design',
        'Wireframing',
        'Prototyping',
        'Brand identity',
        'User research',
      ],
      [AIEmployeeType.MARKETER]: [
        'SEO optimization',
        'Campaign strategy',
        'Content marketing',
        'Analytics reporting',
        'Social media management',
      ],
      [AIEmployeeType.WRITER]: [
        'Blog writing',
        'Copywriting',
        'Technical writing',
        'Content strategy',
        'Editing & proofreading',
      ],
      [AIEmployeeType.ANALYST]: [
        'Data visualization',
        'Statistical analysis',
        'Predictive modeling',
        'Business reporting',
        'KPI tracking',
      ],
      [AIEmployeeType.SUPPORT]: [
        'Issue troubleshooting',
        'Customer inquiries',
        'Product guidance',
        'Escalation handling',
        'Knowledge base creation',
      ],
    };
    return capabilities[type];
  }

  getAllAgents(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }

  getAgentsByType(type: AIEmployeeType): AgentDefinition[] {
    return this.getAllAgents().filter(agent => agent.type === type);
  }

  getAgentById(id: string): AgentDefinition | undefined {
    return this.agents.get(id);
  }

  createTask(task: Omit<AgentTask, 'taskId' | 'createdAt' | 'status'>): AgentTask {
    const newTask: AgentTask = {
      ...task,
      taskId: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date(),
    };

    this.tasks.set(newTask.taskId, newTask);
    return newTask;
  }

  getTask(taskId: string): AgentTask | undefined {
    return this.tasks.get(taskId);
  }

  updateTask(taskId: string, updates: Partial<AgentTask>): AgentTask | undefined {
    const task = this.tasks.get(taskId);
    if (!task) return undefined;

    const updatedTask = { ...task, ...updates };
    this.tasks.set(taskId, updatedTask);
    return updatedTask;
  }

  getTasksByStatus(status: AgentTask['status']): AgentTask[] {
    return Array.from(this.tasks.values()).filter(task => task.status === status);
  }
}

// Global agent registry
const registry = new AgentRegistry();

// Route a user request to the appropriate agent
export async function routeToAgent(userMessage: string, context?: Record<string, any>): Promise<{
  agentType: AIEmployeeType;
  agent: AgentDefinition;
  task: AgentTask;
}> {
  // Classify the intent using Gemini
  const agentType = await classifyIntent(userMessage);

  // Get available agents of this type
  const availableAgents = registry.getAgentsByType(agentType);

  if (availableAgents.length === 0) {
    throw new Error(`No available agents for type: ${agentType}`);
  }

  // Select the best agent (for demo, just pick the first one)
  // In production, this would use Agentuity's intelligent routing
  const selectedAgent = availableAgents[0];

  // Create a task
  const task = registry.createTask({
    agentType,
    userMessage,
    context,
    priority: 'medium',
  });

  return {
    agentType,
    agent: selectedAgent,
    task,
  };
}

// Get all registered agents
export function getAllAgents(): AgentDefinition[] {
  return registry.getAllAgents();
}

// Get agents by type
export function getAgentsByType(type: AIEmployeeType): AgentDefinition[] {
  return registry.getAgentsByType(type);
}

// Get agent by ID
export function getAgentById(id: string): AgentDefinition | undefined {
  return registry.getAgentById(id);
}

// Create a new task
export function createAgentTask(
  agentType: AIEmployeeType,
  userMessage: string,
  options: {
    context?: Record<string, any>;
    priority?: 'low' | 'medium' | 'high';
  } = {}
): AgentTask {
  return registry.createTask({
    agentType,
    userMessage,
    context: options.context,
    priority: options.priority || 'medium',
  });
}

// Update task status
export function updateTaskStatus(
  taskId: string,
  status: AgentTask['status'],
  result?: string
): AgentTask | undefined {
  const updates: Partial<AgentTask> = { status };

  if (status === 'completed' || status === 'failed') {
    updates.completedAt = new Date();
  }

  if (result) {
    updates.result = result;
  }

  return registry.updateTask(taskId, updates);
}

// Get task by ID
export function getTask(taskId: string): AgentTask | undefined {
  return registry.getTask(taskId);
}

// Get tasks by status
export function getTasksByStatus(status: AgentTask['status']): AgentTask[] {
  return registry.getTasksByStatus(status);
}

// Agent health check
export function checkAgentHealth(agentId: string): {
  healthy: boolean;
  latency: number;
  lastCheck: Date;
} {
  const agent = registry.getAgentById(agentId);

  if (!agent) {
    return {
      healthy: false,
      latency: -1,
      lastCheck: new Date(),
    };
  }

  // Simulate health check
  return {
    healthy: agent.status === 'active',
    latency: agent.performance.averageResponseTime * 1000,
    lastCheck: new Date(),
  };
}

// Get agent performance metrics
export function getAgentMetrics(agentId: string): AgentDefinition['performance'] | null {
  const agent = registry.getAgentById(agentId);
  return agent ? agent.performance : null;
}

// Collaborative task execution (multi-agent)
export async function executeCollaborativeTask(
  _taskDescription: string,
  requiredAgentTypes: AIEmployeeType[]
): Promise<{
  taskId: string;
  agents: AgentDefinition[];
  status: string;
}> {
  const agents: AgentDefinition[] = [];

  // Get one agent of each required type
  for (const type of requiredAgentTypes) {
    const availableAgents = registry.getAgentsByType(type);
    if (availableAgents.length > 0) {
      agents.push(availableAgents[0]);
    }
  }

  if (agents.length < requiredAgentTypes.length) {
    throw new Error('Not all required agent types are available');
  }

  // Create a collaborative task
  const taskId = `collab-task-${Date.now()}`;

  return {
    taskId,
    agents,
    status: 'in_progress',
  };
}

export default {
  isAgentuityConfigured,
  routeToAgent,
  getAllAgents,
  getAgentsByType,
  getAgentById,
  createAgentTask,
  updateTaskStatus,
  getTask,
  getTasksByStatus,
  checkAgentHealth,
  getAgentMetrics,
  executeCollaborativeTask,
};
