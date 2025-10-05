import { useNavigate } from 'react-router-dom'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Button } from '@/components/ui/button'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { ScrollExpansionHero } from '@/components/ui/scroll-expansion-hero'
import { Spotlight } from '@/components/ui/spotlight-aceternity'
import DisplayCards from '@/components/ui/display-cards'
import {
  ArrowRight,
  Brain,
  Shield,
  MessageSquare,
  BarChart3,
  Sparkles,
  Zap,
  Users
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const bentoFeatures = [
    {
      Icon: Brain,
      name: "AI Employees",
      description: "Access specialized AI workers trained for any task in your workflow",
      href: "/marketplace",
      cta: "Explore AI Workers",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: MessageSquare,
      name: "Real-time Chat",
      description: "Communicate with your AI team instantly through our advanced chat interface",
      href: "/chat",
      cta: "Start Chatting",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20" />
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BarChart3,
      name: "Analytics Dashboard",
      description: "Track performance, productivity, and ROI with detailed analytics",
      href: "/dashboard",
      cta: "View Dashboard",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: Shield,
      name: "Enterprise Security",
      description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA",
      href: "#",
      cta: "Learn More",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20" />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
    },
  ];

  const displayCardsData = [
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Innovation",
      description: "Cutting-edge AI technology",
      date: "Today",
      titleClassName: "text-blue-500",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Zap className="size-4 text-yellow-300" />,
      title: "Fast",
      description: "Lightning-quick responses",
      date: "Now",
      titleClassName: "text-yellow-500",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Users className="size-4 text-green-300" />,
      title: "Collaborative",
      description: "Work together seamlessly",
      date: "24/7",
      titleClassName: "text-green-500",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Scroll Expansion */}
      {/* <ScrollExpansionHero
        title="AGI Workforce"
        subtitle="Transform your business with AI employees that work 24/7"
      >
        <div className="relative z-10 text-center px-4 max-w-6xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            AGI Workforce
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8">
            Transform your business with AI employees that work 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowButton onClick={() => navigate('/register')} className="text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
              </RainbowButton>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/marketplace')}
            >
              Explore Marketplace
              </Button>
          </div>
        </div>
      </ScrollExpansionHero> */}

      {/* Features Section with Spotlight */}
      {/* <section className="relative py-20 px-4 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and manage your AI workforce
            </p>
        </div>

          <BentoGrid className="lg:grid-rows-2 mb-16">
            {bentoFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section> */}

      {/* Display Cards Section */}
      {/* <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Why Choose AGI Workforce?
        </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The future of work is here
          </p>
        </div>

          <div className="flex justify-center">
            <DisplayCards cards={displayCardsData} />
        </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <TestimonialsSection
        title="Trusted by businesses worldwide"
        description="Join thousands of companies already transforming their workflow with AI"
        testimonials={testimonials}
        className="py-20"
      />

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <Spotlight className="top-40 right-0 md:right-60" fill="white" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start hiring AI employees today and see the difference
          </p>
          <RainbowButton onClick={() => navigate('/register')} className="text-lg px-12 py-6">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </RainbowButton>
        </div>
      </section>
    </div>
  )
}
