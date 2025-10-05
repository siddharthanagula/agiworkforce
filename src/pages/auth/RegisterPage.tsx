import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Github, Mail, Building, User, Check } from 'lucide-react'

export default function RegisterPage() {
  const { loginWithRedirect, isLoading } = useAuth0()
  const navigate = useNavigate()

  const handleAuth0SignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    })
  }

  const handleDemoSignUp = () => {
    navigate('/dashboard')
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join AGI Workforce</h1>
          <p className="text-slate-300">Build your AI-powered team today</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-slate-300">
              Start building your AI workforce in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAuth0SignUp}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Github className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
              
              <Button
                onClick={handleAuth0SignUp}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Demo Sign Up */}
            <div className="space-y-4">
              <RainbowButton
                onClick={handleDemoSignUp}
                className="w-full"
              >
                <User className="mr-2 h-4 w-4" />
                Try Demo Account
              </RainbowButton>
              
              <p className="text-xs text-slate-400 text-center">
                Demo account includes sample AI employees and full platform access
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-medium text-white">What you'll get:</h3>
              <div className="space-y-2">
                {[
                  'Access to 50+ specialized AI employees',
                  'Real-time chat with your AI team',
                  'Task management and analytics',
                  'Custom AI employee creation',
                  'Team collaboration tools'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-300">
                    <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="text-center">
              <p className="text-xs text-slate-400">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
