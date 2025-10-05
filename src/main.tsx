import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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
if (typeof window !== 'undefined') {
  // Initialize ElevenLabs global objects
  if (!window.elevenLabs) {
    window.elevenLabs = {};
  }
  if (!window.elevenLabs.Activity) {
    window.elevenLabs.Activity = {};
  }
  
  // Initialize other potential global objects
  if (!window.agentuity) {
    window.agentuity = {};
  }
  
  // Initialize any other global objects that might be needed
  if (!window.globalState) {
    window.globalState = {};
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
