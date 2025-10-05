import { useNavigate } from 'react-router-dom'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { VaporizeTextEffect, Tag } from '@/components/ui/vapour-text-effect'
import DisplayCards from '@/components/ui/display-cards'
import { 
  ArrowRight, 
  Brain, 
  Shield, 
  MessageSquare,
  BarChart3
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Employees",
      description: "Hire specialized AI workers for any task"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Real-time Chat",
      description: "Communicate with your AI team instantly"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics",
      description: "Track performance and productivity"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure",
      description: "Enterprise-grade security and privacy"
    }
  ]

  const testimonials = [
    {
      author: {
        name: "Sarah Chen",
        handle: "@sarahchen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "AGI Workforce transformed our development process. Our AI employees work 24/7 and never get tired.",
      href: "https://twitter.com/sarahchen"
    },
    {
      author: {
        name: "Marcus Johnson",
        handle: "@marcusj",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "The quality of work from our AI team is exceptional. They've become integral to our operations.",
      href: "https://twitter.com/marcusj"
    },
    {
      author: {
        name: "Elena Rodriguez",
        handle: "@elenar",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Finally, a platform that understands the future of work. Our AI employees are our most valuable assets.",
      href: "https://twitter.com/elenar"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <VaporizeTextEffect
              texts={["AGI Workforce", "AI Employees", "Future of Work"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "4rem",
                fontWeight: 700
              }}
              color="rgb(255,255,255)"
              spread={3}
              density={8}
              animation={{
                vaporizeDuration: 2,
                fadeInDuration: 1,
                waitDuration: 1
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
          </div>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Hire, manage, and collaborate with specialized AI employees. 
            Build your dream team of artificial intelligence workers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RainbowButton
              onClick={() => navigate('/register')}
              className="text-lg px-8 py-4"
            >
              Start Building Your AI Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
            
            <Button
              variant="outline"
              onClick={() => navigate('/marketplace')}
              className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Browse AI Employees
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose AGI Workforce?
            </h2>
            <p className="text-xl text-slate-300">
              The most advanced platform for AI employee management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            See Your AI Team in Action
          </h2>
          <div className="mb-12">
            <DisplayCards />
          </div>
          <Button
            onClick={() => navigate('/marketplace')}
            variant="outline"
            className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Explore AI Employees
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection
        title="Trusted by Innovators Worldwide"
        description="Join thousands of companies already building the future with AI employees"
        testimonials={testimonials}
        className="py-20"
      />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your AI Workforce?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join the revolution. Start hiring AI employees today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowButton
              onClick={() => navigate('/register')}
              className="text-lg px-8 py-4"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
            
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
