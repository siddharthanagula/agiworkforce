import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { AIVoiceInput } from '@/components/ui/ai-voice-input'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'
import { BentoGrid } from '@/components/ui/bento-grid'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { VaporizeTextEffect } from '@/components/ui/vapour-text-effect'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Bot, Sparkles, Zap, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'

export default function LandingPage() {
  const features = [
    {
      title: "AI Software Engineers",
      description: "Build and deploy applications with AI developers that never sleep",
      icon: Bot,
      color: "text-blue-500"
    },
    {
      title: "AI Data Scientists", 
      description: "Analyze data and build ML models with intelligent AI assistants",
      icon: Sparkles,
      color: "text-purple-500"
    },
    {
      title: "AI Marketing Managers",
      description: "Create campaigns and content that converts with AI creativity",
      icon: Zap,
      color: "text-green-500"
    },
    {
      title: "AI Customer Support",
      description: "24/7 customer assistance that understands context and emotions",
      icon: MessageSquare,
      color: "text-orange-500"
    }
  ]

  const benefits = [
    "Scale instantly without hiring delays",
    "Reduce costs by up to 80%",
    "24/7 availability across time zones", 
    "Consistent quality and performance",
    "No training or onboarding required",
    "Instant deployment and scaling"
  ]

  const handleGetStarted = () => {
    toast.success("Welcome to AGI Workforce!")
  }

  const handleVoiceInput = (duration: number) => {
    toast.info(`Voice input recorded for ${duration} seconds`)
  }

  const handlePromptSubmit = (message: string) => {
    toast.success(`Message sent: ${message}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Scroll Expansion */}
      <ScrollExpandMedia 
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop"
        title="AGI Workforce"
        date="2025"
        scrollToExpand="Scroll to explore the future of work"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">The Future of Work is Here</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Deploy AI employees that work 24/7, never get tired, and scale instantly. 
              Transform your business with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RainbowButton onClick={handleGetStarted}>
                Get Started Free
              </RainbowButton>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Browse AI Employees</Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-red-600 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/agi-workforce-logo.svg"
              alt="AGI Workforce"
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold text-white">AGI WORKFORCE</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Employees for Every Role</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Deploy specialized AI employees that excel in their domains
            </p>
          </div>
          
          <BentoGrid className="max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="col-span-3 lg:col-span-1">
                <Card className="h-full bg-gray-900 border-gray-800 hover:border-red-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Try Our AI Interface</h2>
            <p className="text-xl text-gray-400 mb-12">
              Experience how our AI employees communicate and work
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Voice Input Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AIVoiceInput 
                    onStop={handleVoiceInput}
                    demoMode={true}
                    demoInterval={5000}
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Chat Interface
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PromptInputBox 
                    onSend={handlePromptSubmit}
                    placeholder="Ask our AI employees anything..."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Showcase Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Experience the Future</h2>
            <p className="text-xl text-gray-400">
              Interactive 3D visualization of AI workforce capabilities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="h-96">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose AGI Workforce?</h2>
              <p className="text-xl text-gray-400">
                Transform your business with intelligent automation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Cost Savings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Traditional Hiring</span>
                    <span className="text-red-400">$50,000+/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AGI Workforce</span>
                    <span className="text-green-400">$5,000/month</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>You Save</span>
                      <span className="text-green-400">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vaporize Text Effect Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <VaporizeTextEffect 
              texts={["AGI Workforce", "AI Employees", "Future of Work"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "70px",
                fontWeight: 600
              }}
              color="rgb(239, 68, 68)"
              spread={5}
              density={5}
              animation={{
                vaporizeDuration: 2,
                fadeInDuration: 1,
                waitDuration: 1
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection 
        title="What Our Customers Say"
        description="Join thousands of businesses using AI employees"
        testimonials={[
          {
            author: {
              name: "Sarah Johnson",
              handle: "@sarahj_ceo",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
            },
            text: "AGI Workforce has revolutionized how we handle customer support. Our AI employees work 24/7 and never get tired!"
          },
          {
            author: {
              name: "Mike Chen",
              handle: "@mikechen_cto",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            },
            text: "The AI developers from AGI Workforce have helped us build features faster than ever before."
          },
          {
            author: {
              name: "Emily Rodriguez",
              handle: "@emily_marketing",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            },
            text: "Our AI marketing team creates content that converts better than our human team ever did."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using AI employees to scale their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowButton onClick={handleGetStarted}>
              Start Free Trial
            </RainbowButton>
            <Button variant="outline" size="lg" asChild>
              <Link to="/marketplace">View All AI Employees</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AGI Workforce</h3>
              <p className="text-gray-400">
                The future of work is here. Deploy AI employees that scale with your business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/marketplace">AI Employees</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/chat">AI Chat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/status">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AGI Workforce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
