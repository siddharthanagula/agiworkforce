import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Sparkles, Zap, DollarSign, Users, MessageSquare } from 'lucide-react'
import { ElevenLabsVoice } from '@/components/voice/ElevenLabsVoice'

export default function LandingPage() {
  const aiEmployees = [
    { name: 'Software Engineer', icon: Bot, description: 'Build and deploy applications', price: 1 },
    { name: 'Data Scientist', icon: Sparkles, description: 'Analyze data and build models', price: 1 },
    { name: 'Marketing Manager', icon: Zap, description: 'Create campaigns and content', price: 1 },
    { name: 'Customer Support', icon: MessageSquare, description: '24/7 customer assistance', price: 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AGI Workforce</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Hire AI Employees for Your Business
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get access to specialized AI agents powered by Claude, ChatGPT, and Gemini.
            Just $1/month per employee.
          </p>

          {/* Voice Assistant */}
          <div className="my-12">
            <h2 className="text-2xl text-foreground mb-6">Try Our Voice Assistant</h2>
            <ElevenLabsVoice />
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Browse AI Employees
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime</p>
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

      {/* AI Employees Showcase */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Meet Your AI Employees
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiEmployees.map((employee, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <employee.icon className="h-16 w-16 text-primary mb-4" />
                <CardTitle>{employee.name}</CardTitle>
                <CardDescription>{employee.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">${employee.price}/mo</p>
                <Link to="/register">
                  <Button className="w-full mt-4">Hire Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your AI Workforce?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses using AI employees to scale faster.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 AGI Workforce. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
