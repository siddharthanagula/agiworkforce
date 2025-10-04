import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Code, BarChart, Megaphone, HeadphonesIcon, Database, PenTool, Shield } from 'lucide-react'
import type { AIEmployee } from '@/types'

export default function MarketplacePage() {
  const aiEmployees: (AIEmployee & { icon: typeof Bot })[] = [
    {
      id: '1',
      name: 'Claude Engineer',
      role: 'Software Engineer',
      provider: 'claude',
      description: 'Expert in full-stack development, code review, and system architecture',
      capabilities: ['React', 'Node.js', 'TypeScript', 'System Design'],
      price: 1,
      status: 'active',
      icon: Code,
    },
    {
      id: '2',
      name: 'GPT Data Scientist',
      role: 'Data Scientist',
      provider: 'chatgpt',
      description: 'Specialized in data analysis, ML models, and insights generation',
      capabilities: ['Python', 'ML', 'Data Analysis', 'Statistics'],
      price: 1,
      status: 'active',
      icon: BarChart,
    },
    {
      id: '3',
      name: 'Gemini Marketing Pro',
      role: 'Marketing Manager',
      provider: 'gemini',
      description: 'Creative campaigns, SEO optimization, and content strategy',
      capabilities: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
      price: 1,
      status: 'active',
      icon: Megaphone,
    },
    {
      id: '4',
      name: 'Claude Support Agent',
      role: 'Customer Support',
      provider: 'claude',
      description: '24/7 customer service with empathy and problem-solving skills',
      capabilities: ['Support', 'Communication', 'Problem Solving', 'CRM'],
      price: 1,
      status: 'active',
      icon: HeadphonesIcon,
    },
    {
      id: '5',
      name: 'GPT DevOps Engineer',
      role: 'DevOps Engineer',
      provider: 'chatgpt',
      description: 'Infrastructure management, CI/CD, and cloud deployment',
      capabilities: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      price: 1,
      status: 'active',
      icon: Database,
    },
    {
      id: '6',
      name: 'Gemini Content Writer',
      role: 'Content Writer',
      provider: 'gemini',
      description: 'Blog posts, documentation, and creative writing',
      capabilities: ['Writing', 'Editing', 'SEO', 'Research'],
      price: 1,
      status: 'active',
      icon: PenTool,
    },
    {
      id: '7',
      name: 'Claude Security Expert',
      role: 'Security Engineer',
      provider: 'claude',
      description: 'Security audits, penetration testing, and vulnerability assessment',
      capabilities: ['Security', 'Pentesting', 'Compliance', 'Risk Assessment'],
      price: 1,
      status: 'active',
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary">AGI Workforce</h1>
          </Link>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/chat">
              <Button>Start Chat</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">AI Employees Marketplace</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hire specialized AI employees powered by Claude, ChatGPT, and Gemini.
              Just $1/month per employee.
            </p>
          </div>

          {/* AI Employees Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <employee.icon className="h-16 w-16 text-primary mb-4" />
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-primary">
                    {employee.role}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {employee.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {employee.capabilities.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${employee.price}/mo
                    </span>
                    <Button>Hire Now</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Powered by {employee.provider}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
