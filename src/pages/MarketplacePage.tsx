import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  MessageSquare, 
  Brain,
  Code,
  BarChart3,
  Shield,
  Heart
} from 'lucide-react'

interface AIEmployee {
  id: string
  name: string
  role: string
  description: string
  skills: string[]
  rating: number
  price: number
  availability: 'available' | 'busy' | 'offline'
  avatar: string
  category: string
  experience: string
  responseTime: string
  completedTasks: number
}

export default function MarketplacePage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: <Users className="h-4 w-4" /> },
    { id: 'development', name: 'Development', icon: <Code className="h-4 w-4" /> },
    { id: 'design', name: 'Design', icon: <Brain className="h-4 w-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'support', name: 'Support', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="h-4 w-4" /> }
  ]

  const aiEmployees: AIEmployee[] = [
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Senior Full-Stack Developer',
      description: 'Expert in React, Node.js, and cloud architecture. Specializes in building scalable web applications.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      rating: 4.9,
      price: 150,
      availability: 'available',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      category: 'development',
      experience: '5+ years',
      responseTime: '< 1 min',
      completedTasks: 1247
    },
    {
      id: '2',
      name: 'Sarah Kim',
      role: 'UI/UX Designer',
      description: 'Creative designer with expertise in user experience and interface design. Passionate about creating intuitive digital experiences.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      rating: 4.8,
      price: 120,
      availability: 'available',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      category: 'design',
      experience: '4+ years',
      responseTime: '< 2 min',
      completedTasks: 892
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      description: 'Machine learning expert specializing in predictive analytics and data visualization. PhD in Computer Science.',
      skills: ['Python', 'TensorFlow', 'Pandas', 'SQL', 'Statistics'],
      rating: 4.9,
      price: 200,
      availability: 'busy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      category: 'development',
      experience: '6+ years',
      responseTime: '< 5 min',
      completedTasks: 2156
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      role: 'Digital Marketing Specialist',
      description: 'Growth hacker with expertise in SEO, social media marketing, and conversion optimization.',
      skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Strategy'],
      rating: 4.7,
      price: 100,
      availability: 'available',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      category: 'marketing',
      experience: '3+ years',
      responseTime: '< 1 min',
      completedTasks: 634
    },
    {
      id: '5',
      name: 'David Park',
      role: 'Cybersecurity Expert',
      description: 'Security specialist focused on threat detection, vulnerability assessment, and security architecture.',
      skills: ['Penetration Testing', 'Security Auditing', 'Incident Response', 'Compliance', 'Risk Assessment'],
      rating: 4.9,
      price: 180,
      availability: 'available',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      category: 'security',
      experience: '7+ years',
      responseTime: '< 3 min',
      completedTasks: 1834
    },
    {
      id: '6',
      name: 'Lisa Wang',
      role: 'Customer Support Specialist',
      description: 'Multilingual support expert with experience in technical support and customer success.',
      skills: ['Customer Service', 'Technical Support', 'Zendesk', 'Multilingual', 'Problem Solving'],
      rating: 4.8,
      price: 80,
      availability: 'available',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      category: 'support',
      experience: '2+ years',
      responseTime: '< 1 min',
      completedTasks: 456
    }
  ]

  const filteredEmployees = aiEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || employee.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleHireEmployee = (employeeId: string) => {
    // Navigate to chat with the hired employee
    navigate(`/chat/${employeeId}`)
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Employee Marketplace</h1>
              <p className="text-slate-300 mt-2">Hire specialized AI employees for your team</p>
            </div>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              My Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search AI employees by name, role, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* AI Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getAvailabilityColor(employee.availability)}`} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{employee.name}</CardTitle>
                      <CardDescription className="text-slate-300">{employee.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{employee.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm">{employee.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {employee.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                      {skill}
                    </Badge>
                  ))}
                  {employee.skills.length > 3 && (
                    <Badge variant="secondary" className="bg-slate-600/20 text-slate-300 border-slate-500/30">
                      +{employee.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-white ml-1">{employee.experience}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Response:</span>
                    <span className="text-white ml-1">{employee.responseTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tasks:</span>
                    <span className="text-white ml-1">{employee.completedTasks.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Price:</span>
                    <span className="text-white ml-1">${employee.price}/hr</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleHireEmployee(employee.id)}
                    disabled={employee.availability === 'offline'}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {employee.availability === 'available' ? 'Hire Now' : 'Chat'}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No AI employees found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
