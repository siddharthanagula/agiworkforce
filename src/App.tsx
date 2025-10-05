import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { isAuth0Configured, getAuth0Config } from '@/lib/auth0'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import LandingPage from '@/pages/LandingPage'
import MarketplacePage from '@/pages/MarketplacePage'
// Don't import chat page to avoid loading elevenlabs
// import EnhancedChatPage from '@/pages/chat/EnhancedChatPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import { Toaster } from '@/components/ui/sonner'

// Global type declarations
declare global {
  interface Window {
    elevenLabs?: {
      Activity?: any;
    };
    agentuity?: any;
  }
}

// Initialize global objects with error handling
if (typeof window !== 'undefined') {
  try {
    // Initialize ElevenLabs global objects
    if (!window.elevenLabs) {
      window.elevenLabs = {};
    }
    if (!window.elevenLabs.Activity) {
      window.elevenLabs.Activity = {
        initialized: true,
        timestamp: Date.now(),
        context: 'App.tsx'
      };
    }
    
    // Initialize other potential global objects
    if (!window.agentuity) {
      window.agentuity = {};
    }
  } catch (error) {
    console.error('App.tsx global object initialization failed:', error);
  }
}

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
        {/* Chat routes temporarily disabled to avoid elevenlabs loading issues */}
        {/* <Route path="/chat" element={
          <ProtectedRoute>
            <EnhancedChatPage />
          </ProtectedRoute>
        } />
        <Route path="/chat/:id" element={
          <ProtectedRoute>
            <EnhancedChatPage />
          </ProtectedRoute>
        } /> */}

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Notifications */}
      <Toaster />
    </Router>
  )
}

export default AppWrapper
