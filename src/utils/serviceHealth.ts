/**
 * Service Health Check Utilities
 * 
 * Provides comprehensive health checks for all external services
 * and helps diagnose configuration issues
 */

import { isAuth0Configured } from '@/lib/auth0';

// Check if Gemini API is configured
export function isGeminiConfigured(): boolean {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  return !!(apiKey && apiKey.length > 0);
}

// Check if ElevenLabs API is configured
export function isElevenLabsConfigured(): boolean {
  const apiKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY;
  return !!(apiKey && apiKey.length > 0);
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const url = (import.meta as any).env?.VITE_SUPABASE_URL;
  const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'your_supabase_url' && key !== 'your_supabase_anon_key');
}

// Service health status interface
export interface ServiceHealthStatus {
  name: string;
  configured: boolean;
  required: boolean;
  message: string;
}

// Comprehensive service health check
export function checkAllServices(): ServiceHealthStatus[] {
  const services: ServiceHealthStatus[] = [
    {
      name: 'Auth0',
      configured: isAuth0Configured(),
      required: true,
      message: isAuth0Configured() 
        ? '✅ Auth0 is configured' 
        : '⚠️ Auth0 not configured - Add VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID to .env'
    },
    {
      name: 'Gemini AI',
      configured: isGeminiConfigured(),
      required: false,
      message: isGeminiConfigured()
        ? '✅ Gemini AI is configured'
        : '⚠️ Gemini AI not configured - Add VITE_GEMINI_API_KEY to .env for AI chat features'
    },
    {
      name: 'ElevenLabs',
      configured: isElevenLabsConfigured(),
      required: false,
      message: isElevenLabsConfigured()
        ? '✅ ElevenLabs is configured'
        : '⚠️ ElevenLabs not configured - Add VITE_ELEVENLABS_API_KEY to .env for voice features'
    },
    {
      name: 'Supabase',
      configured: isSupabaseConfigured(),
      required: false,
      message: isSupabaseConfigured()
        ? '✅ Supabase is configured'
        : '⚠️ Supabase not configured - Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'
    }
  ];

  return services;
}

// Log service health to console
export function logServiceHealth(): void {
  console.group('🏥 Service Health Check');
  
  const services = checkAllServices();
  
  services.forEach(service => {
    const icon = service.configured ? '✅' : (service.required ? '❌' : '⚠️');
    console.log(`${icon} ${service.name}: ${service.configured ? 'Configured' : 'Not configured'}`);
    if (!service.configured) {
      console.log(`   ${service.message}`);
    }
  });
  
  const allRequired = services.filter(s => s.required).every(s => s.configured);
  const allOptional = services.filter(s => !s.required).every(s => s.configured);
  
  console.log('');
  console.log(`Required services: ${allRequired ? '✅ All configured' : '❌ Some missing'}`);
  console.log(`Optional services: ${allOptional ? '✅ All configured' : '⚠️ Some missing'}`);
  
  console.groupEnd();
}

// Check if app can run with current configuration
export function canAppRun(): boolean {
  const services = checkAllServices();
  return services.filter(s => s.required).every(s => s.configured);
}

// Get missing required services
export function getMissingRequiredServices(): string[] {
  const services = checkAllServices();
  return services
    .filter(s => s.required && !s.configured)
    .map(s => s.name);
}

// Get missing optional services
export function getMissingOptionalServices(): string[] {
  const services = checkAllServices();
  return services
    .filter(s => !s.required && !s.configured)
    .map(s => s.name);
}

// Initialize health check on module load
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Log service health in development
  setTimeout(() => {
    logServiceHealth();
  }, 1000);
}

export default {
  isGeminiConfigured,
  isElevenLabsConfigured,
  isSupabaseConfigured,
  isAuth0Configured,
  checkAllServices,
  logServiceHealth,
  canAppRun,
  getMissingRequiredServices,
  getMissingOptionalServices
};
