import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import MarketplacePage from '@/pages/MarketplacePage'
import ChatPage from '@/pages/chat/ChatPage'
import ScrollExpansionPage from '@/pages/ScrollExpansionPage'
import VaporizeTextPage from '@/pages/VaporizeTextPage'
import { ExpandableChatDemo } from '@/components/ui/expandable-chat-demo'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/scroll-demo" element={<ScrollExpansionPage />} />
            <Route path="/vaporize-demo" element={<VaporizeTextPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Global Expandable Chat */}
      <ExpandableChatDemo />
      
      {/* Global Toast Notifications */}
      <Toaster />
    </Router>
  )
}

export default App
