import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { initializeAllGlobals } from './utils/errorPrevention'
import { initializeWithErrorHandling, setupGlobalErrorHandlers } from './utils/errorHandling'

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
initializeWithErrorHandling();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
