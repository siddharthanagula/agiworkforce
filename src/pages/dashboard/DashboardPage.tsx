import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import LogoutButton from '@/components/auth/LogoutButton'
import { 
  Plus, 
  Star, 
  MessageSquare, 
  Clock,
  TrendingUp,
  Users,
  Bot,
  Activity,
  Settings,
  Bell,
  ChevronRight,
  Play,
  Pause,
  MoreVertical
} from 'lucide-react'

interface AIEmployee {
  id: string
  name: string
  role: string
  avatar: string
  status: 'online' | 'busy' | 'offline'
  rating: number
  tasksCompleted: number
  hoursWorked: number
  lastActive: string
  skills: string[]
  performance: number
}

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  progress: number
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const aiEmployees: AIEmployee[] = [
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Senior Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      rating: 4.9,
      tasksCompleted: 47,
      hoursWorked: 156,
      lastActive: '2 minutes ago',
      skills: ['React', 'Node.js', 'TypeScript'],
      performance: 95
    },
    {
      id: '2',
      name: 'Sarah Kim',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      status: 'busy',
      rating: 4.8,
      tasksCompleted: 32,
      hoursWorked: 128,
      lastActive: '5 minutes ago',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      performance: 88
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      rating: 4.9,
      tasksCompleted: 28,
      hoursWorked: 142,
      lastActive: '1 minute ago',
      skills: ['Python', 'TensorFlow', 'SQL'],
      performance: 92
    }
  ]

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Add secure login and registration functionality',
      assignedTo: 'Alex Chen',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-15',
      progress: 75
    },
    {
      id: '2',
      title: 'Design mobile app interface',
      description: 'Create responsive design for mobile devices',
      assignedTo: 'Sarah Kim',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-20',
      progress: 0
    },
    {
      id: '3',
      title: 'Analyze user behavior data',
      description: 'Process and visualize user interaction patterns',
      assignedTo: 'Marcus Johnson',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-01-10',
      progress: 100
    }
  ]

  const stats = {
    totalEmployees: aiEmployees.length,
    activeEmployees: aiEmployees.filter(emp => emp.status === 'online').length,
    tasksCompleted: tasks.filter(task => task.status === 'completed').length,
    totalHours: aiEmployees.reduce((sum, emp) => sum + emp.hoursWorked, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor2 = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Workforce Dashboard</h1>
              <p className="text-slate-300 mt-2">Manage your AI employees and track performance</p>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.picture} alt={user.name || user.email} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm">{user.name || user.email}</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <LogoutButton />
              <Button
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Hire AI Employee
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalEmployees}</div>
              <p className="text-xs text-slate-400">
                {stats.activeEmployees} active now
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Tasks Completed</CardTitle>
              <Activity className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.tasksCompleted}</div>
              <p className="text-xs text-slate-400">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalHours}</div>
              <p className="text-xs text-slate-400">
                Hours worked
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">92%</div>
              <p className="text-xs text-slate-400">
                Average rating
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Employees */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My AI Employees</h2>
              <Button
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            <div className="space-y-4">
              {aiEmployees.map((employee) => (
                <Card 
                  key={employee.id} 
                  className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                    selectedEmployee === employee.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedEmployee(employee.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>
                              <Bot className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(employee.status)}`} />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-white">{employee.name}</h3>
                          <p className="text-slate-300">{employee.role}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-slate-300">{employee.rating}</span>
                            </div>
                            <span className="text-sm text-slate-400">Last active: {employee.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-slate-300">{employee.tasksCompleted} tasks</div>
                          <div className="text-sm text-slate-400">{employee.hoursWorked}h worked</div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/chat/${employee.id}`)
                            }}
                            className="text-white hover:bg-white/20"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {employee.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-slate-300 mb-1">
                        <span>Performance</span>
                        <span>{employee.performance}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${employee.performance}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Tasks</h2>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-slate-300 mb-3">{task.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Assigned to: {task.assignedTo}</span>
                      <span>Due: {task.dueDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor2(task.status)}>
                        {task.status}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Pause className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {task.status === 'in-progress' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
