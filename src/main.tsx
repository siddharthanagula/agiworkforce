import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { auth0Config, isAuth0Configured } from './lib/auth0'
import './index.css'
import App from './App.tsx'

// Create a wrapper component that conditionally renders Auth0Provider
function AppWrapper() {
  if (isAuth0Configured()) {
    return (
      <Auth0Provider {...auth0Config}>
        <App />
      </Auth0Provider>
    )
  }
  
  // Fallback when Auth0 is not configured
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
