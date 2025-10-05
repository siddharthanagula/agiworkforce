import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BentoGrid } from '@/components/ui/bento-grid'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  MessageSquare, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Plus,
  Settings,
  Star,
  Download,
  Play,
  Pause
} from 'lucide-react'

interface AIEmployee {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'busy' | 'offline'
  tasksCompleted: number
  hoursWorked: number
  rating: number
  lastActive: Date
  currentTask?: string
  avatar: string
}

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  assignedTo: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  dueDate?: Date
  progress: number
}

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const aiEmployees: AIEmployee[] = [
    {
      id: '1',
      name: 'Claude Engineer',
      role: 'Software Engineer',
      status: 'active',
      tasksCompleted: 24,
      hoursWorked: 168,
      rating: 4.9,
      lastActive: new Date(),
      currentTask: 'Building React components',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'GPT Marketer',
      role: 'Marketing Manager',
      status: 'busy',
      tasksCompleted: 18,
      hoursWorked: 142,
      rating: 4.7,
      lastActive: new Date(Date.now() - 300000),
      currentTask: 'Creating social media content',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Gemini Analyst',
      role: 'Data Scientist',
      status: 'idle',
      tasksCompleted: 12,
      hoursWorked: 89,
      rating: 4.8,
      lastActive: new Date(Date.now() - 1800000),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Build user authentication system',
      description: 'Implement secure login and registration functionality',
      status: 'in-progress',
      assignedTo: 'Claude Engineer',
      priority: 'high',
      createdAt: new Date('2025-01-01'),
      dueDate: new Date('2025-01-15'),
      progress: 75
    },
    {
      id: '2',
      title: 'Create marketing campaign',
      description: 'Design and implement Q1 marketing strategy',
      status: 'pending',
      assignedTo: 'GPT Marketer',
      priority: 'medium',
      createdAt: new Date('2025-01-02'),
      dueDate: new Date('2025-01-20'),
      progress: 0
    },
    {
      id: '3',
      title: 'Analyze user behavior data',
      description: 'Process and analyze user interaction patterns',
      status: 'completed',
      assignedTo: 'Gemini Analyst',
      priority: 'low',
      createdAt: new Date('2024-12-28'),
      progress: 100
    }
  ]

  const stats = {
    totalEmployees: aiEmployees.length,
    activeEmployees: aiEmployees.filter(emp => emp.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    totalHours: aiEmployees.reduce((sum, emp) => sum + emp.hoursWorked, 0),
    costSavings: 85000,
    productivity: 94
  }

  const handleStartTask = () => {
    toast.success('Task started successfully')
  }

  const handlePauseTask = () => {
    toast.info('Task paused')
  }

  const handleCompleteTask = () => {
    toast.success('Task completed!')
  }

  const handleHireEmployee = () => {
    toast.info('Redirecting to marketplace...')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'idle': return 'bg-blue-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/agi-workforce-logo.svg"
                alt="AGI Workforce"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold">AGI WORKFORCE</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6 ml-8">
              <Link to="/dashboard" className="text-red-500 font-medium">Dashboard</Link>
              <Link to="/chat" className="text-gray-400 hover:text-white">Chat</Link>
              <Link to="/marketplace" className="text-gray-400 hover:text-white">Marketplace</Link>
            </div>
            </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Quick Stats</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Employees</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {stats.activeEmployees}/{stats.totalEmployees}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tasks Completed</span>
                  <span className="text-sm font-medium">{stats.completedTasks}/{stats.totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Productivity</span>
                  <span className="text-sm font-medium text-green-400">{stats.productivity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-4">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                >
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <Button onClick={handleHireEmployee}>
                  <Plus className="mr-2 h-4 w-4" />
                  Hire AI Employee
                </Button>
              </div>
            </div>
            <p className="text-gray-400">
              Monitor your AI workforce performance and manage tasks
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Employees</p>
                    <p className="text-2xl font-bold">{stats.totalEmployees}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Hours Worked</p>
                    <p className="text-2xl font-bold">{stats.totalHours}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Cost Savings</p>
                    <p className="text-2xl font-bold">${stats.costSavings.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
              </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Productivity</p>
                    <p className="text-2xl font-bold">{stats.productivity}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
              </Card>
          </div>

          {/* AI Employees */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">AI Employees</h2>
              <Button variant="outline" asChild>
                <Link to="/marketplace">View All</Link>
              </Button>
          </div>

            <BentoGrid className="max-w-6xl">
              {aiEmployees.map(employee => (
                <div key={employee.id} className="col-span-3 lg:col-span-1">
                  <Card className="bg-gray-900 border-gray-800 hover:border-red-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-gray-900 ${getStatusColor(employee.status)}`} />
                          </div>
          <div>
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {employee.status}
                        </Badge>
                      </div>
                      
                      {employee.currentTask && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-400 mb-1">Current Task</p>
                          <p className="text-sm">{employee.currentTask}</p>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tasks Completed</span>
                          <span>{employee.tasksCompleted}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Hours Worked</span>
                          <span>{employee.hoursWorked}h</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{employee.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </BentoGrid>
          </div>

          {/* Tasks */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Tasks</h2>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
            
            <div className="space-y-4">
              {tasks.map(task => (
                <Card key={task.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={getPriorityColor(task.priority)}
                        >
                          {task.priority}
                        </Badge>
                        <Badge 
                          variant={task.status === 'completed' ? 'default' : 'secondary'}
                          className={
                            task.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : task.status === 'in-progress'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Assigned to: {task.assignedTo}</span>
                        <span>Created: {task.createdAt.toLocaleDateString()}</span>
                        {task.dueDate && (
                          <span>Due: {task.dueDate.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        {task.status === 'pending' && (
                          <Button size="sm" onClick={handleStartTask}>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                          </Button>
                        )}
                        {task.status === 'in-progress' && (
                          <>
                            <Button size="sm" variant="outline" onClick={handlePauseTask}>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </Button>
                            <Button size="sm" onClick={handleCompleteTask}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Complete
                            </Button>
                          </>
                        )}
                        {task.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        )}
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">Claude Engineer completed "Build user authentication system"</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">GPT Marketer started working on "Create marketing campaign"</p>
                      <p className="text-xs text-gray-400">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">Gemini Analyst is analyzing user behavior data</p>
                      <p className="text-xs text-gray-400">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
          </div>
        </div>
    </div>
  )
}
