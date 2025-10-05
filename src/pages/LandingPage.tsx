import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { AIVoiceInput } from '@/components/ui/ai-voice-input'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { BentoDemo } from '@/components/ui/bento-grid-demo'
import { ExpandableChatDemo } from '@/components/ui/expandable-chat-demo'
import { ImageExpansion } from '@/components/ui/scroll-expansion-hero-demo'
import { TestimonialsSectionDemo } from '@/components/ui/testimonials-with-marquee-demo'
import { VaporizeTextAIDemo } from '@/components/ui/vapour-text-effect-ai-demo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Bot, Sparkles, Zap, DollarSign, Users, MessageSquare } from 'lucide-react'
import { ElevenLabsVoice } from '@/components/voice/ElevenLabsVoice'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'

export default function LandingPage() {
  const aiEmployees = [
    { name: 'Software Engineer', icon: Bot, description: 'Build and deploy applications', price: 1 },
    { name: 'Data Scientist', icon: Sparkles, description: 'Analyze data and build models', price: 1 },
    { name: 'Marketing Manager', icon: Zap, description: 'Create campaigns and content', price: 1 },
    { name: 'Customer Support', icon: MessageSquare, description: '24/7 customer assistance', price: 1 },
  ]

  return (
    <div className="min-h-screen">
      {/* Scroll Expansion Hero Section */}
      <ImageExpansion />
      
      <div className="bg-black">
        {/* Navigation */}
        <nav className="border-b border-red-600 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/ZVQxKGT/agi-workforce-logo.png"
              alt="AGI Workforce"
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold text-white">AGI WORKFORCE</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/scroll-demo" className="text-red-400 hover:text-red-300 text-sm">
              Scroll Demo
            </Link>
            <Link to="/vaporize-demo" className="text-red-400 hover:text-red-300 text-sm">
              Vaporize Demo
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-red-500">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-red-600 hover:bg-red-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="red" />
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <img
            src="https://i.ibb.co/ZVQxKGT/agi-workforce-logo.png"
            alt="AGI Workforce Logo"
            className="h-32 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Hire AI Employees for Your Business
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get access to specialized AI agents powered by Claude, ChatGPT, and Gemini.
            Just $1/month per employee.
          </p>

          {/* Voice Assistant */}
          <div className="my-12">
            <h2 className="text-2xl text-foreground mb-6">Try Our AI Input Methods</h2>
            <div className="space-y-8">
              <ElevenLabsVoice />
              <div className="text-center">
                <h3 className="text-lg text-foreground mb-4">Or Try Our New Voice Input</h3>
                <AIVoiceInput 
                  demoMode={true}
                  demoInterval={4000}
                  className="max-w-md mx-auto"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg text-foreground mb-4">Advanced AI Prompt Box</h3>
                <div className="max-w-2xl mx-auto">
                  <PromptInputBox 
                    onSend={(message, files) => {
                      console.log('Demo message:', message, files)
                      toast.success("Demo message sent!", {
                        description: "This is a demo of our advanced AI input system"
                      })
                    }}
                    placeholder="Try our advanced AI input with voice, images, and smart modes..."
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg text-foreground mb-4">Live AI Support Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click the chat button in the bottom-right corner to try our AI support
                </p>
                <div className="max-w-md mx-auto h-96 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Chat widget appears in bottom-right corner
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <RainbowButton>
                Start Free Trial
              </RainbowButton>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Browse AI Employees
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime</p>
        </div>

        {/* 3D Spline Scene */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none hidden lg:block">
          <SplineScene
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Why Choose AGI Workforce?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <DollarSign className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Affordable Pricing</CardTitle>
              <CardDescription>
                Pay only $1/month per AI employee. No hidden fees.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-2" />
              <CardTitle>20+ Specialists</CardTitle>
              <CardDescription>
                Access AI experts across engineering, marketing, support, and more.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Multi-AI Powered</CardTitle>
              <CardDescription>
                Powered by leading AI models: Claude, ChatGPT, Gemini, and Perplexity.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* AI Capabilities Showcase */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">What AI Employees Can Do</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful capabilities of our AI workforce through interactive examples
          </p>
        </div>
        <BentoDemo />
      </section>

      {/* AI Employees Showcase */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
          Meet Your AI Employees
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiEmployees.map((employee, index) => (
            <Card key={index} className="bg-zinc-900 border-red-600/30 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all">
              <CardHeader>
                <employee.icon className="h-16 w-16 text-red-500 mb-4" />
                <CardTitle className="text-white">{employee.name}</CardTitle>
                <CardDescription className="text-gray-400">{employee.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-500">${employee.price}/mo</p>
                <Link to="/register">
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Hire Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vaporize Text Effect Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Experience the Future of Text Animation
          </h2>
          <VaporizeTextAIDemo />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSectionDemo />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-12 text-white border-2 border-red-500">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your AI Workforce?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses using AI employees to scale faster.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-red-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-600 bg-black py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 AGI Workforce. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-red-500">Privacy</a>
            <a href="#" className="hover:text-red-500">Terms</a>
            <a href="#" className="hover:text-red-500">Contact</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
