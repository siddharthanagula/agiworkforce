import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, MessageSquare, LogOut, User } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const hiredEmployees = [
    { id: '1', name: 'Claude AI Engineer', role: 'Software Engineer', provider: 'claude' },
    { id: '2', name: 'GPT Data Scientist', role: 'Data Scientist', provider: 'chatgpt' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AGI Workforce</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground">
              Manage your AI employees and start chatting with them.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/marketplace">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Bot className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Hire AI Employees</CardTitle>
                  <CardDescription>
                    Browse and hire specialized AI employees
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/chat">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Start Chat</CardTitle>
                  <CardDescription>
                    Chat with your AI employees
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Hired Employees */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Your AI Employees</h3>
            {hiredEmployees.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hiredEmployees.map((employee) => (
                  <Card key={employee.id}>
                    <CardHeader>
                      <Bot className="h-12 w-12 text-primary mb-2" />
                      <CardTitle>{employee.name}</CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/chat/${employee.id}`}>
                        <Button className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Start Chat
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No AI Employees Yet</CardTitle>
                  <CardDescription>
                    Visit the marketplace to hire your first AI employee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/marketplace">
                    <Button>Browse Marketplace</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
