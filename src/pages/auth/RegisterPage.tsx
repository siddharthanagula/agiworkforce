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
  User,
  Building,
  Github, 
  Chrome,
  ArrowLeft,
  Loader2,
  CheckCircle
} from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      toast.success('Account created successfully!')
      navigate('/dashboard')
      setIsLoading(false)
    }, 2000)
  }

  const handleGoogleSignup = () => {
    toast.info('Google signup coming soon!')
  }

  const handleGitHubSignup = () => {
    toast.info('GitHub signup coming soon!')
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
              Join thousands of companies already using AI employees to scale their operations.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Free Trial</h3>
                <p className="text-sm">Start with 3 AI employees free</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Instant Deployment</h3>
                <p className="text-sm">Deploy AI employees in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-200">
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Enterprise Ready</h3>
                <p className="text-sm">Scale to any team size</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
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
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-gray-400">Start your AI workforce journey</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-400">Start your AI workforce journey today</p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Create your account to start hiring AI employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your Company Inc."
                      value={formData.company}
                      onChange={handleInputChange}
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
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-red-500 hover:text-red-400">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-red-500 hover:text-red-400">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
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
                    onClick={handleGoogleSignup}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGitHubSignup}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-1 gap-4">
            <Card className="bg-green-900/20 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-green-400">Free Trial Included</h3>
                    <p className="text-sm text-green-300">3 AI employees free for 14 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-blue-400">Instant Access</h3>
                    <p className="text-sm text-blue-300">Start hiring AI employees immediately</p>
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
