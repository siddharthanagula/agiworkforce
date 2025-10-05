import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { AIVoiceInput } from '@/components/ui/ai-voice-input'
import { EmptyState } from '@/components/ui/empty-state'
import { toast } from 'sonner'
import { 
  Bot, 
  User, 
  Mic, 
  Share, 
  MoreVertical,
  Plus,
  MessageSquare,
  Loader2,
  ArrowLeft,
  Settings,
  Copy
} from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  status: 'sending' | 'sent' | 'error'
  type: 'text' | 'voice' | 'file'
  files?: File[]
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  aiEmployee: {
    name: string
    role: string
    provider: string
    avatar: string
  }
}

export default function ChatPage() {
  const { id } = useParams()
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAI, setSelectedAI] = useState<string>('claude-engineer')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aiEmployees = [
    {
      id: 'claude-engineer',
      name: 'Claude Engineer',
      role: 'Software Engineer',
      provider: 'claude',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      description: 'Expert in full-stack development and system architecture'
    },
    {
      id: 'gpt-marketer',
      name: 'GPT Marketer',
      role: 'Marketing Manager',
      provider: 'chatgpt',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      description: 'Creative campaigns and content strategy expert'
    },
    {
      id: 'gemini-analyst',
      name: 'Gemini Analyst',
      role: 'Data Scientist',
      provider: 'gemini',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      description: 'Data analysis and machine learning specialist'
    }
  ]

  const chatSessions = [
    {
      id: '1',
      title: 'React Component Architecture',
      messages: [],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      aiEmployee: aiEmployees[0]
    },
    {
      id: '2',
      title: 'Marketing Campaign Strategy',
      messages: [],
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02'),
      aiEmployee: aiEmployees[1]
    },
    {
      id: '3',
      title: 'Data Analysis Project',
      messages: [],
      createdAt: new Date('2025-01-03'),
      updatedAt: new Date('2025-01-03'),
      aiEmployee: aiEmployees[2]
    }
  ]

  useEffect(() => {
    if (id) {
      const session = chatSessions.find(s => s.id === id)
      if (session) {
        setCurrentSession(session)
        setMessages(session.messages)
      }
    } else {
      setCurrentSession(null)
      setMessages([])
    }
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!content.trim() && !files?.length) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      status: 'sent',
      type: files?.length ? 'file' : 'text',
      files
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${content}". Let me help you with that. This is a simulated response from the AI employee.`,
        role: 'assistant',
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleVoiceInput = (duration: number) => {
    const voiceMessage: Message = {
      id: Date.now().toString(),
      content: `Voice message (${duration}s)`,
      role: 'user',
      timestamp: new Date(),
      status: 'sent',
      type: 'voice'
    }
    setMessages(prev => [...prev, voiceMessage])
    toast.success(`Voice message recorded for ${duration} seconds`)
  }

  const handleNewChat = () => {
    setCurrentSession(null)
    setMessages([])
    toast.success('Started new chat session')
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Message copied to clipboard')
  }

  const currentAI = aiEmployees.find(ai => ai.id === selectedAI)

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">AI Chat</h1>
            <Button variant="ghost" size="sm" onClick={handleNewChat}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* AI Employee Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Select AI Employee</label>
            <select
              value={selectedAI}
              onChange={(e) => setSelectedAI(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {aiEmployees.map(ai => (
                <option key={ai.id} value={ai.id}>
                  {ai.name} - {ai.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {chatSessions.map(session => (
              <Link
                key={session.id}
                to={`/chat/${session.id}`}
                className={`block p-3 rounded-lg border transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-red-600 border-red-500'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={session.aiEmployee.avatar}
                    alt={session.aiEmployee.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{session.title}</div>
                    <div className="text-sm text-gray-400 truncate">
                      {session.aiEmployee.name}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {session.updatedAt.toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard">
              <Settings className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/chat">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              {currentAI && (
                <div className="flex items-center gap-3">
                  <img
                    src={currentAI.avatar}
                    alt={currentAI.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{currentAI.name}</div>
                    <div className="text-sm text-gray-400">{currentAI.role}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <EmptyState
              title="Start a conversation"
              description="Send a message to begin chatting with your AI employee"
              icons={[MessageSquare, Bot, User]}
            />
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <img
                    src={currentAI?.avatar}
                    alt="AI"
                    className="h-8 w-8 rounded-full flex-shrink-0"
                  />
                )}
                
                <div
                  className={`max-w-2xl rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      {message.type === 'voice' ? (
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          <span>{message.content}</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                      
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.files.map((file, index) => (
                            <div key={index} className="text-sm text-gray-300">
                              📎 {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyMessage(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {message.status === 'sending' && (
                    <div className="flex items-center gap-1 mt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Sending...</span>
                    </div>
                  )}
                </div>
                
                {message.role === 'user' && (
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="h-8 w-8 rounded-full flex-shrink-0"
                  />
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3">
              <img
                src={currentAI?.avatar}
                alt="AI"
                className="h-8 w-8 rounded-full flex-shrink-0"
              />
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-900 border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <PromptInputBox
                  onSend={handleSendMessage}
                  placeholder={`Message ${currentAI?.name || 'AI Employee'}...`}
                  isLoading={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <AIVoiceInput
                  onStop={handleVoiceInput}
                  className="w-12 h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
