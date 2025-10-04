export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface AIEmployee {
  id: string
  name: string
  role: string
  provider: 'claude' | 'chatgpt' | 'gemini'
  description: string
  capabilities: string[]
  price: number
  image?: string
  status: 'active' | 'inactive'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  employeeId?: string
}

export interface ChatSession {
  id: string
  userId: string
  employeeId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface HiredEmployee {
  id: string
  userId: string
  employeeId: string
  hiredAt: Date
  status: 'active' | 'paused'
}
