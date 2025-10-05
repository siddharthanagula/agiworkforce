/**
 * Comprehensive Error Handling Utilities
 * 
 * Prevents "Uncaught" errors by ensuring proper Error objects
 * and providing global error handlers for debugging
 */

// Global error handlers to capture thrown values
export function setupGlobalErrorHandlers(): void {
  if (typeof window === 'undefined') return;

  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Global Error Handler:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
      stack: event.error?.stack
    });
    
    // If error is not a proper Error object, create one
    if (!(event.error instanceof Error)) {
      console.error('Non-Error thrown:', event.error);
      // Create a proper Error object for debugging
      const properError = new Error(`Non-Error thrown: ${JSON.stringify(event.error)}`);
      console.error('Converted to proper Error:', properError);
    }
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', {
      reason: event.reason,
      promise: event.promise
    });
    
    // If rejection reason is not a proper Error, create one
    if (!(event.reason instanceof Error)) {
      console.error('Non-Error promise rejection:', event.reason);
      const properError = new Error(`Promise rejected with non-Error: ${JSON.stringify(event.reason)}`);
      console.error('Converted to proper Error:', properError);
    }
  });
}

// Safe error throwing utility
export function safeThrow(message: string, originalError?: any): never {
  const error = new Error(message);
  
  if (originalError) {
    // Store original error in a custom property for compatibility
    (error as any).originalError = originalError;
    console.error('Original error:', originalError);
  }
  
  console.error('Throwing proper Error:', error);
  throw error;
}

// Safe property assignment with proper error handling
export function safeSetPropertyWithErrorHandling(
  target: any,
  property: string,
  value: any,
  context: string = 'unknown'
): boolean {
  try {
    if (!target) {
      const error = new Error(`Target object is undefined for property '${property}' in context: ${context}`);
      console.error('Safe property assignment failed:', error);
      return false;
    }

    if (!target[property]) {
      target[property] = {};
    }

    target[property] = value;
    return true;
  } catch (error) {
    const properError = new Error(`Failed to set property '${property}' in context '${context}': ${error}`);
    console.error('Property assignment error:', properError);
    return false;
  }
}

// Safe Activity property assignment with comprehensive error handling
export function safeSetActivityWithErrorHandling(
  target: any,
  value: any,
  context: string = 'unknown'
): boolean {
  try {
    if (!target) {
      const error = new Error(`Target object is undefined for Activity assignment in context: ${context}`);
      console.error('Activity assignment failed:', error);
      return false;
    }

    if (!target.Activity) {
      target.Activity = {
        initialized: true,
        timestamp: Date.now(),
        context: context
      };
    }

    target.Activity = { ...target.Activity, ...value };
    return true;
  } catch (error) {
    const properError = new Error(`Failed to set Activity property in context '${context}': ${error}`);
    console.error('Activity assignment error:', properError);
    return false;
  }
}

// Comprehensive initialization with error handling
export function initializeWithErrorHandling(): void {
  try {
    console.log('Starting comprehensive initialization...');
    
    if (typeof window === 'undefined') {
      console.warn('Window object not available');
      return;
    }

    // Initialize ElevenLabs with error handling
    if (!window.elevenLabs) {
      window.elevenLabs = {};
      console.log('Initialized elevenLabs object');
    }

    if (!window.elevenLabs.Activity) {
      window.elevenLabs.Activity = {
        initialized: true,
        timestamp: Date.now(),
        version: '1.0.0'
      };
      console.log('Initialized Activity property');
    }

    // Test assignment with error handling
    try {
      window.elevenLabs.Activity.test = 'initialization-test';
      delete window.elevenLabs.Activity.test;
      console.log('Activity property test successful');
    } catch (error) {
      const properError = new Error(`Activity property test failed: ${error}`);
      console.error('Activity test error:', properError);
      
      // Recreate Activity object
      window.elevenLabs.Activity = {
        initialized: true,
        timestamp: Date.now(),
        version: '1.0.0',
        errorRecovery: true
      };
    }

    // Initialize other global objects
    const globalObjects = ['agentuity', 'globalState'];
    globalObjects.forEach(objName => {
      try {
        if (!(window as any)[objName]) {
          (window as any)[objName] = {};
          console.log(`Initialized ${objName} object`);
        }
      } catch (error) {
        const properError = new Error(`Failed to initialize ${objName}: ${error}`);
        console.error('Global object initialization error:', properError);
      }
    });

    console.log('Comprehensive initialization completed successfully');
  } catch (error) {
    const properError = new Error(`Initialization failed: ${error}`);
    console.error('Initialization error:', properError);
    // Don't throw - just log the error and continue
    console.error('⚠️ Failed to initialize global objects, but continuing:', error);
  }
}

// Error boundary for React components
export function withErrorBoundary<T>(
  fn: () => T,
  fallback: T,
  context: string = 'unknown'
): T {
  try {
    return fn();
  } catch (error) {
    const properError = new Error(`Error in ${context}: ${error}`);
    console.error('Error boundary caught:', properError);
    return fallback;
  }
}

// Initialize error handlers on module load
if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
  console.log('Global error handlers setup complete');
}
