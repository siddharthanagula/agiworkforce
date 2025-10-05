import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { isAuth0Configured, getAuth0Config } from '@/lib/auth0'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import LandingPage from '@/pages/LandingPage'
import MarketplacePage from '@/pages/MarketplacePage'
import EnhancedChatPage from '@/pages/chat/EnhancedChatPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import { Toaster } from '@/components/ui/sonner'

function AppWrapper() {
  const auth0ConfigData = getAuth0Config()
  
  if (isAuth0Configured() && auth0ConfigData) {
    return (
      <Auth0Provider
        domain={auth0ConfigData.domain}
        clientId={auth0ConfigData.clientId}
        authorizationParams={auth0ConfigData.authorizationParams}
      >
        <App />
      </Auth0Provider>
    )
  }
  
  return <App />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <EnhancedChatPage />
          </ProtectedRoute>
        } />
        <Route path="/chat/:id" element={
          <ProtectedRoute>
            <EnhancedChatPage />
          </ProtectedRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Notifications */}
      <Toaster />
    </Router>
  )
}

export default AppWrapper
