import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RainbowButton } from '@/components/ui/rainbow-button'
import LoginButton from '@/components/auth/LoginButton'
import { Lock, ShieldAlert, User } from 'lucide-react'
import { isAuth0Configured } from '@/lib/auth0'

export default function LoginPage() {
  return isAuth0Configured() ? <Auth0LoginScreen /> : <UnconfiguredLoginScreen />
}

function Auth0LoginScreen() {
  const { isLoading } = useAuth0()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)

  const handleDemoLogin = () => {
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
    <LoginLayout
      isSignUp={isSignUp}
      onToggleSignUp={() => setIsSignUp(!isSignUp)}
      onDemoLogin={handleDemoLogin}
      authSection={<LoginButton />}
      helperSection={
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-slate-400">Or continue with</span>
          </div>
        </div>
      }
    />
  )
}

function UnconfiguredLoginScreen() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)

  const handleDemoLogin = () => {
    navigate('/dashboard')
  }

  return (
    <LoginLayout
      isSignUp={isSignUp}
      onToggleSignUp={() => setIsSignUp(!isSignUp)}
      onDemoLogin={handleDemoLogin}
      authSection={
        <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4 text-left">
          <div className="flex items-center gap-3 text-white">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-semibold">Auth0 is not configured</p>
              <p className="text-xs text-slate-200/80">
                Please add your Auth0 credentials to the environment variables to enable login.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-200/70">
            <p>Checklist:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Set <span className="font-mono">VITE_AUTH0_DOMAIN</span> in Vercel/ENV</li>
              <li>Set <span className="font-mono">VITE_AUTH0_CLIENT_ID</span></li>
              <li>Deploy the project after updating values</li>
            </ul>
          </div>
        </div>
      }
      helperSection={
        <p className="text-xs text-slate-200/70 text-center">
          Once credentials are added, refresh the page to enable Auth0 login.
        </p>
      }
    />
  )
}

interface LoginLayoutProps {
  isSignUp: boolean
  onToggleSignUp: () => void
  onDemoLogin: () => void
  authSection: React.ReactNode
  helperSection?: React.ReactNode
}

function LoginLayout({
  isSignUp,
  onToggleSignUp,
  onDemoLogin,
  authSection,
  helperSection
}: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to AGI Workforce</h1>
          <p className="text-slate-300">Hire and manage your AI employees</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {isSignUp
                ? 'Join the future of AI-powered workforce'
                : 'Welcome back to your AI team'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {authSection}

            {helperSection}

            <div className="space-y-4">
              <RainbowButton
                onClick={onDemoLogin}
                className="w-full"
              >
                <Lock className="mr-2 h-4 w-4" />
                Try Demo Account
              </RainbowButton>

              <p className="text-xs text-slate-400 text-center">
                Demo account gives you full access to explore the platform
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={onToggleSignUp}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
