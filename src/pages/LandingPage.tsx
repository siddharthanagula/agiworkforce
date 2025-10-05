import { useNavigate } from 'react-router-dom'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="w-full border-b border-white/10 sticky top-0 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-r from-blue-500 to-purple-600" />
            <span className="font-semibold tracking-tight">AGI Workforce</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <button className="hover:text-blue-300" onClick={() => navigate('/marketplace')}>Marketplace</button>
            <button className="hover:text-blue-300" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="hover:text-blue-300" onClick={() => navigate('/login')}>Login</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4">
        <div className="max-w-6xl mx-auto py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Hire AI Employees that work 24/7
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Build your team of specialized AI developers, designers, marketers and more.
            Chat, assign tasks, and track performance in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <RainbowButton onClick={() => navigate('/register')} className="px-8 py-6 text-base">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-8 py-3 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 transition"
            >
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Specialized AI Talent',
              desc: 'Choose from roles like Developer, Designer, Marketer, Analyst, Writer and Support.'
            },
            {
              title: 'Real-time Collaboration',
              desc: 'Chat with AI employees, assign tasks, and get measurable outcomes.'
            },
            {
              title: 'Enterprise-Ready',
              desc: 'Secure by default with modern best practices and Auth0-powered login.'
            }
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-fuchsia-600/20 p-10">
          <h2 className="text-3xl md:text-5xl font-bold">Ready to build your AI team?</h2>
          <p className="mt-4 text-slate-300">
            Sign up and hire your first AI employee in minutes.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <RainbowButton onClick={() => navigate('/register')} className="px-10 py-6 text-base">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </RainbowButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-10 border-t border-white/10 text-sm text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} AGI Workforce</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-200" onClick={() => navigate('/login')}>Login</button>
            <button className="hover:text-slate-200" onClick={() => navigate('/register')}>Register</button>
            <button className="hover:text-slate-200" onClick={() => navigate('/marketplace')}>Marketplace</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
