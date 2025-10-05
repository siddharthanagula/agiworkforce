import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeGlobalObjects, setupGlobalErrorHandlers } from './utils/errorHandling'
import { logServiceHealth } from './utils/serviceHealth'

// Global type declarations
declare global {
  interface Window {
    elevenLabs?: {
      Activity?: any;
    };
    agentuity?: any;
    globalState?: any;
  }
}

// Setup global error handlers first
setupGlobalErrorHandlers();

// Initialize global objects with comprehensive error handling
initializeGlobalObjects();

// Log service health in development
if (process.env.NODE_ENV === 'development') {
  logServiceHealth();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
