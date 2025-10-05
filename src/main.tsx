import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeAllGlobals } from './utils/errorPrevention'

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

// Initialize global objects before React starts
initializeAllGlobals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
