import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BentoGrid } from '@/components/ui/bento-grid'
import { EmptyState } from '@/components/ui/empty-state'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Bot, 
  Code, 
  BarChart, 
  Megaphone, 
  HeadphonesIcon, 
  Database, 
  PenTool, 
  Shield, 
  Search, 
  Filter,
  Star,
  Clock,
  Zap
} from 'lucide-react'
import type { AIEmployee } from '@/types'

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  
  const categories = [
    { id: 'all', label: 'All', icon: Bot },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'data', label: 'Data Science', icon: BarChart },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'support', label: 'Support', icon: HeadphonesIcon },
    { id: 'design', label: 'Design', icon: PenTool }
  ]

  const allEmployees: (AIEmployee & { icon: typeof Bot; category: string; rating: number; reviews: number })[] = [
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
      category: 'development',
      rating: 4.9,
      reviews: 127
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
      category: 'data',
      rating: 4.8,
      reviews: 89
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
      category: 'marketing',
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Claude Support Agent',
      role: 'Customer Support',
      provider: 'claude',
      description: '24/7 customer support with empathy and problem-solving skills',
      capabilities: ['Customer Service', 'Problem Solving', 'Multi-language', 'Empathy'],
      price: 1,
      status: 'active',
      icon: HeadphonesIcon,
      category: 'support',
      rating: 4.9,
      reviews: 203
    },
    {
      id: '5',
      name: 'GPT Designer',
      role: 'UI/UX Designer',
      provider: 'chatgpt',
      description: 'Creative design solutions with modern UI/UX principles',
      capabilities: ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping'],
      price: 1,
      status: 'active',
      icon: PenTool,
      category: 'design',
      rating: 4.6,
      reviews: 94
    },
    {
      id: '6',
      name: 'Gemini Database Admin',
      role: 'Database Administrator',
      provider: 'gemini',
      description: 'Database optimization, security, and performance tuning',
      capabilities: ['SQL', 'Database Design', 'Security', 'Performance'],
      price: 1,
      status: 'active',
      icon: Database,
      category: 'development',
      rating: 4.8,
      reviews: 67
    },
    {
      id: '7',
      name: 'Claude Security Expert',
      role: 'Security Specialist',
      provider: 'claude',
      description: 'Cybersecurity expert with threat detection and prevention',
      capabilities: ['Security Analysis', 'Threat Detection', 'Compliance', 'Risk Assessment'],
      price: 1,
      status: 'active',
      icon: Shield,
      category: 'development',
      rating: 4.9,
      reviews: 45
    }
  ]

  const filteredEmployees = allEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || employee.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        return a.price - b.price
      case 'reviews':
        return b.reviews - a.reviews
      default:
        return b.rating - a.rating
    }
  })

  const handleHireEmployee = (employee: typeof allEmployees[0]) => {
    toast.success(`Hired ${employee.name}! Redirecting to dashboard...`)
  }

  const handleViewDetails = (employee: typeof allEmployees[0]) => {
    toast.info(`Viewing details for ${employee.name}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/agi-workforce-logo.svg"
              alt="AGI Workforce"
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold">AGI WORKFORCE</h1>
          </Link>
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">AI Employee Marketplace</h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Browse and hire specialized AI employees for every role. 
              Scale your business with intelligent automation.
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search AI employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price">Lowest Price</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Employees Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {sortedEmployees.length === 0 ? (
            <EmptyState
              title="No AI Employees Found"
              description="Try adjusting your search criteria or browse all categories"
              icons={[Search, Bot, Filter]}
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }
              }}
            />
          ) : (
            <BentoGrid className="max-w-7xl mx-auto">
              {sortedEmployees.map((employee) => (
                <div key={employee.id} className="col-span-3 lg:col-span-1">
                  <Card className="h-full bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <employee.icon className="h-6 w-6 text-red-500" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{employee.name}</CardTitle>
                            <CardDescription className="text-gray-400">
                              {employee.role}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {employee.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{employee.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{employee.rating}</span>
                          <span className="text-sm text-gray-400">({employee.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>24/7 Available</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {employee.capabilities.map((capability, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-green-400">
                          ${employee.price}/hour
                        </div>
                        <div className="text-sm text-gray-400">
                          vs $50-100/hour human
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleHireEmployee(employee)}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          Hire Now
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewDetails(employee)}
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </BentoGrid>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
              <p className="text-xl text-gray-400">
                Join companies already using AI employees to scale their operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">10,000+</div>
                <div className="text-gray-400">AI Employees Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">500+</div>
                <div className="text-gray-400">Companies Using</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">99.9%</div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">80%</div>
                <div className="text-gray-400">Cost Savings</div>
              </div>
            </div>
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
          <h2 className="text-4xl font-bold mb-4">Ready to Hire Your First AI Employee?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start with a free trial and see how AI employees can transform your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">View Dashboard</Link>
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
