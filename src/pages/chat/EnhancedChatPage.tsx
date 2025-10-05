import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Volume2,
  Loader2,
  Bot,
  User,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

// Import our services
import { chatWithAIEmployee, AIEmployeeType, isGeminiConfigured } from '@/services/gemini'
import { textToSpeech, playAudio, VOICE_PROFILES, isElevenLabsConfigured } from '@/services/elevenlabs'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'voice' | 'file'
  isTyping?: boolean
  audioBlob?: Blob
}

interface AIEmployee {
  id: string
  name: string
  type: AIEmployeeType
  role: string
  avatar: string
  status: 'online' | 'busy' | 'offline'
  responseTime: string
  rating: number
  skills: string[]
}

export default function EnhancedChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'model'; parts: string }>>([])
  const [isGeneratingVoice, setIsGeneratingVoice] = useState<string | null>(null)
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<AIEmployeeType>(AIEmployeeType.DEVELOPER)

  // AI Employee configuration
  const getAIEmployee = (type: AIEmployeeType): AIEmployee => {
    const employees: Record<AIEmployeeType, Omit<AIEmployee, 'id'>> = {
      [AIEmployeeType.DEVELOPER]: {
        name: 'Alex Chen',
        type: AIEmployeeType.DEVELOPER,
        role: 'Senior Full-Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 1 min',
        rating: 4.9,
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
      },
      [AIEmployeeType.DESIGNER]: {
        name: 'Aria Kim',
        type: AIEmployeeType.DESIGNER,
        role: 'Lead UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 2 min',
        rating: 4.8,
        skills: ['Figma', 'UI Design', 'Branding', 'Prototyping']
      },
      [AIEmployeeType.MARKETER]: {
        name: 'Morgan Davis',
        type: AIEmployeeType.MARKETER,
        role: 'Digital Marketing Strategist',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 1 min',
        rating: 4.7,
        skills: ['SEO', 'Content', 'Analytics', 'Social Media']
      },
      [AIEmployeeType.WRITER]: {
        name: 'Jordan Taylor',
        type: AIEmployeeType.WRITER,
        role: 'Content Writer & Editor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 2 min',
        rating: 4.9,
        skills: ['Copywriting', 'SEO', 'Editing', 'Storytelling']
      },
      [AIEmployeeType.ANALYST]: {
        name: 'Riley Smith',
        type: AIEmployeeType.ANALYST,
        role: 'Data Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 1 min',
        rating: 4.8,
        skills: ['Python', 'SQL', 'Tableau', 'Statistics']
      },
      [AIEmployeeType.SUPPORT]: {
        name: 'Casey Brown',
        type: AIEmployeeType.SUPPORT,
        role: 'Customer Support Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        status: 'online',
        responseTime: '< 30 sec',
        rating: 5.0,
        skills: ['Support', 'Communication', 'Problem Solving']
      }
    }

    return { ...employees[type], id: id || type }
  }

  const aiEmployee = getAIEmployee(selectedEmployeeType)
  const voiceProfile = VOICE_PROFILES[selectedEmployeeType]

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
          content: `Hello! I'm ${voiceProfile.name}, your ${aiEmployee.role}. ${voiceProfile.description}. How can I assist you today?`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        }
      ])
    }
  }, [aiEmployee.role, voiceProfile.name, voiceProfile.description, messages.length])

  const handleSendMessage = async (message: string, files?: File[]) => {
    if (!message.trim() && (!files || files.length === 0)) return

    // Check if Gemini is configured
    if (!isGeminiConfigured()) {
      toast.error('Gemini API is not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Update conversation history
    const newHistory = [...conversationHistory, { role: 'user' as const, parts: message }]
    setConversationHistory(newHistory)

    try {
      // Get response from Gemini
      const aiResponse = await chatWithAIEmployee(selectedEmployeeType, message, conversationHistory)

      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, aiMessage])

      // Update conversation history
      setConversationHistory([...newHistory, { role: 'model', parts: aiResponse }])

      // Generate voice if ElevenLabs is configured
      if (isElevenLabsConfigured()) {
        generateAndAttachVoice(aiMessage.id, aiResponse)
      }

      setIsTyping(false)
    } catch (error) {
      console.error('Error getting AI response:', error)
      toast.error('Failed to get AI response. Please check your API configuration.')
      setIsTyping(false)

      // Add error message
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please make sure your Gemini API key is configured correctly.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }])
    }
  }

  const generateAndAttachVoice = async (messageId: string, text: string) => {
    setIsGeneratingVoice(messageId)

    try {
      const audioBlob = await textToSpeech(text, selectedEmployeeType)

      if (audioBlob) {
        // Update message with audio blob
        setMessages(prev => prev.map(msg =>
          msg.id === messageId ? { ...msg, audioBlob } : msg
        ))
      }
    } catch (error) {
      console.error('Error generating voice:', error)
    } finally {
      setIsGeneratingVoice(null)
    }
  }

  const handlePlayVoice = async (audioBlob: Blob) => {
    try {
      await playAudio(audioBlob)
    } catch (error) {
      console.error('Error playing audio:', error)
      toast.error('Failed to play audio')
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              size="icon"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={aiEmployee.avatar} alt={aiEmployee.name} />
                  <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${
                  aiEmployee.status === 'online' ? 'bg-green-500' :
                  aiEmployee.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
              </div>

              <div>
                <h2 className="font-semibold text-foreground">{voiceProfile.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{aiEmployee.role}</span>
                  <span>•</span>
                  <span className="text-green-500">{aiEmployee.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isGeminiConfigured() && (
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Gemini Powered
              </Badge>
            )}
            {isElevenLabsConfigured() && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Volume2 className="h-3 w-3 mr-1" />
                Voice Enabled
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* AI Employee Type Selector */}
      <div className="bg-muted/30 border-b border-border p-2">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {Object.values(AIEmployeeType).map((type) => (
            <Button
              key={type}
              variant={selectedEmployeeType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedEmployeeType(type)
                setMessages([])
                setConversationHistory([])
              }}
              className="capitalize whitespace-nowrap"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={aiEmployee.avatar} alt={voiceProfile.name} />
                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}

              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>

                  {message.sender === 'ai' && isElevenLabsConfigured() && (
                    message.audioBlob ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => handlePlayVoice(message.audioBlob!)}
                      >
                        <Volume2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Play</span>
                      </Button>
                    ) : isGeneratingVoice === message.id ? (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Generating voice...
                      </div>
                    ) : null
                  )}
                </div>
              </div>

              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={aiEmployee.avatar} alt={voiceProfile.name} />
                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <PromptInputBox
            onSend={handleSendMessage}
            isLoading={isTyping}
            placeholder={`Message ${voiceProfile.name}...`}
          />
        </div>
      </div>
    </div>
  )
}
