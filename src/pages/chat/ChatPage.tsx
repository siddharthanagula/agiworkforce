import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  Bot,
  User
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'voice' | 'file'
  isTyping?: boolean
}

interface AIEmployee {
  id: string
  name: string
  role: string
  avatar: string
  status: 'online' | 'busy' | 'offline'
  responseTime: string
  rating: number
  skills: string[]
}

export default function ChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  // Mock AI Employee data
  const aiEmployee: AIEmployee = {
    id: id || '1',
    name: 'Alex Chen',
    role: 'Senior Full-Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'online',
    responseTime: '< 1 min',
    rating: 4.9,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
          setMessages([
            {
              id: '1',
          content: `Hello! I'm ${aiEmployee.name}, your ${aiEmployee.role}. I'm here to help you with development tasks, code reviews, architecture decisions, and technical problem-solving. How can I assist you today?`,
          sender: 'ai',
              timestamp: new Date(),
          type: 'text'
        }
      ])
    }
  }, [aiEmployee.name, aiEmployee.role, messages.length])

  const handleSendMessage = (message: string, files?: File[]) => {
    if (!message.trim() && (!files || files.length === 0)) return

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      `I understand your request about "${userMessage}". Let me help you with that. Based on your message, I can provide several approaches to solve this problem.`,
      `That's an interesting challenge regarding "${userMessage}"! I've worked on similar projects before. Here's how I would approach this:`,
      `Great question about "${userMessage}"! This is a common scenario in development. Let me break down the solution for you:`,
      `I can definitely help you with "${userMessage}". Let me analyze the requirements and provide you with a comprehensive solution.`,
      `Excellent! I have experience with this type of project related to "${userMessage}". Here's my recommended approach:`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
          </Button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={aiEmployee.avatar} alt={aiEmployee.name} />
                  <AvatarFallback>{aiEmployee.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                  aiEmployee.status === 'online' ? 'bg-green-500' : 
                  aiEmployee.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
              </div>
              
          <div>
                <h2 className="text-white font-semibold">{aiEmployee.name}</h2>
                <p className="text-slate-300 text-sm">{aiEmployee.role}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-slate-300">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm">{aiEmployee.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-slate-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{aiEmployee.responseTime}</span>
            </div>

            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>
        </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={aiEmployee.avatar} alt={aiEmployee.name} />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`rounded-lg px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-white backdrop-blur-md'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center mt-1 text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === 'user' && (
                    <CheckCircle className="h-3 w-3 ml-1" />
                  )}
              </div>
              </div>

              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={aiEmployee.avatar} alt={aiEmployee.name} />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              
              <div className="bg-white/10 text-white backdrop-blur-md rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
            </div>
              </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
                <PromptInputBox
            onSend={handleSendMessage}
            placeholder="Type your message to Alex..."
            className="bg-white/10 border-white/20"
          />
        </div>
      </div>
    </div>
  )
}
