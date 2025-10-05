import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { 
  Bot, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  ArrowLeft,
  Loader2
} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      toast.success('Login successful!')
      navigate('/dashboard')
      setIsLoading(false)
    }, 2000)
  }

  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!')
  }

  const handleGitHubLogin = () => {
    toast.info('GitHub login coming soon!')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/agi-workforce-logo.svg"
                alt="AGI Workforce"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">AGI WORKFORCE</h1>
            <p className="text-xl text-gray-200 max-w-md">
              The future of work is here. Deploy AI employees that scale with your business.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Employees</h3>
                <p className="text-sm">Deploy specialized AI workers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm">Enterprise-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Chrome className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Available</h3>
                <p className="text-sm">Never sleeps, never takes breaks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex items-center justify-center mb-4">
              <img
                src="/agi-workforce-logo.svg"
                alt="AGI Workforce"
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Enter your credentials to access your AI workforce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-400">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGitHubLogin}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-red-500 hover:text-red-400 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6 bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Demo Credentials</h3>
              <div className="text-sm text-blue-300 space-y-1">
                <p><strong>Email:</strong> demo@agiworkforce.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
