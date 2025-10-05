import { useState, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
// import { AIVoiceInput } from '@/components/ui/ai-voice-input'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { EmptyState } from '@/components/ui/empty-state'
// import { toast } from 'sonner'
import { Send, Bot, User as UserIcon, ArrowLeft, Mic, MessageSquare, Brain } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { sendMessage, createChatSession, getChatMessages } from '@/lib/agents/chat-service'
import type { ChatMessage } from '@/types'

export default function ChatPage() {
  const { id: employeeId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [employeeName] = useState('AI Employee')
  const [employeeRole] = useState('Software Engineer')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  // const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [inputMode, setInputMode] = useState<'basic' | 'advanced'>('basic')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize chat session
  useEffect(() => {
    const initializeChat = async () => {
      if (!user || !employeeId) {
        navigate('/marketplace')
        return
      }

      try {
        // Create a new chat session
        const newSessionId = await createChatSession({
          userId: user.sub || user.email || 'demo-user',
          employeeId,
        })
        setSessionId(newSessionId)

        // Load existing messages if any
        const existingMessages = await getChatMessages(newSessionId)

        if (existingMessages.length === 0) {
          // Add welcome message
          setMessages([
            {
              id: '1',
              role: 'assistant',
              content: `Hello! I'm your ${employeeRole}. How can I help you today?`,
              timestamp: new Date(),
            },
          ])
        } else {
          setMessages(existingMessages)
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error)
        // Fallback to demo mode
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: `Hello! I'm your ${employeeRole}. How can I help you today?`,
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsInitializing(false)
      }
    }

    initializeChat()
  }, [user, employeeId, employeeRole, navigate])

  const handleSend = async () => {
    if (!input.trim() || !sessionId || !user || !employeeId) return

    const userMessageContent = input
    setInput('')

    // Optimistically add user message to UI
    const tempUserMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: userMessageContent,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, tempUserMessage])
    setIsLoading(true)

    try {
      // Send message and get AI response
      const aiMessage = await sendMessage({
        sessionId,
        userId: user.sub || user.email || 'demo-user',
        employeeId,
        employeeRole,
        content: userMessageContent,
      })

      // Update messages with actual AI response
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Failed to send message:', error)

      // Fallback error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // const handleVoiceStart = () => {
  //   console.log('Voice recording started')
  // }

  // const handleVoiceStop = (duration: number) => {
  //   console.log(`Voice recording stopped after ${duration} seconds`)
  //   // In a real implementation, you would process the voice input here
  //   // For now, we'll just simulate setting some text
  //   setInput('Voice input received (simulated)')
  // }

  const handlePromptSend = async (message: string, _files?: File[]) => {
    if (!message.trim() || !sessionId || !user || !employeeId) return

    // Optimistically add user message to UI
    const tempUserMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, tempUserMessage])
    setIsLoading(true)

    try {
      // Send message and get AI response
      const aiMessage = await sendMessage({
        sessionId,
        userId: user.sub || user.email || 'demo-user',
        employeeId,
        employeeRole,
        content: message,
      })

      // Update messages with actual AI response
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Failed to send message:', error)

      // Fallback error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing chat session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm px-4 py-4 flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-semibold">{employeeName}</h1>
            <p className="text-xs text-muted-foreground">{employeeRole} • Powered by Claude AI</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <EmptyState
              title="Start a Conversation"
              description="Send a message to begin chatting with your AI employee."
              icons={[MessageSquare, Brain]}
              action={{
                label: "Type a message below",
                onClick: () => {
                  // Focus on the input field
                  const inputElement = document.querySelector('textarea, input') as HTMLElement;
                  inputElement?.focus();
                }
              }}
            />
          </div>
        ) : (
          <>
            {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            <Card className={`p-4 max-w-[70%] ${message.role === 'user' ? 'bg-primary text-white' : 'bg-white'}`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <Card className="p-4 bg-white">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Input Mode Toggle */}
          <div className="flex justify-center mb-4 gap-2">
            <Button
              variant={inputMode === 'basic' ? "default" : "outline"}
              onClick={() => setInputMode('basic')}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Basic Input
            </Button>
            <Button
              variant={inputMode === 'advanced' ? "default" : "outline"}
              onClick={() => setInputMode('advanced')}
              className="flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              Advanced Input
            </Button>
          </div>

          {inputMode === 'advanced' ? (
            /* Advanced PromptInputBox */
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <PromptInputBox
                  onSend={handlePromptSend}
                  isLoading={isLoading}
                  placeholder="Ask your AI employee anything..."
                />
              </div>
            </div>
          ) : (
            /* Basic Input Mode */
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
