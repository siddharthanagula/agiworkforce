import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { toast } from 'sonner'
import { Bot, MessageSquare, LogOut, User, Users, Zap } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account"
    })
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
              <span className="font-medium">{user?.name || user?.email}</span>
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
              <div className="flex justify-center">
                <EmptyState
                  title="No AI Employees Hired"
                  description="Start building your AI workforce by hiring specialized AI employees for your business needs."
                  icons={[Bot, Users, Zap]}
                  action={{
                    label: "Browse AI Employees",
                    onClick: () => window.location.href = '/marketplace'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
