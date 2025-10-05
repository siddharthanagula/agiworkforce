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

/**
 * Ensures a deeply nested property path exists on an object.
 * @param obj The root object (e.g., `window`).
 * @param path An array of keys representing the path.
 * @returns The final object in the path.
 */
function ensureObjectPath(obj: any, path: string[]): any {
  let current: any = obj;
  for (const key of path) {
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  return current;
}

/**
 * Centralized initialization for all global objects.
 * This is the single source of truth for global state setup.
 * It should be called once in `main.tsx` before the app renders.
 */
export function initializeGlobalObjects(): void {
  if (typeof window === 'undefined') {
    console.warn('Window object not available during initialization.');
    return;
  }

  try {
    console.log('🚀 Starting global object initialization...');

    // Define all required global objects and their paths
    const requiredGlobals = [
      'elevenLabs.Activity',
      'agentuity',
      'globalState'
    ];

    requiredGlobals.forEach(path => {
      const keys = path.split('.');
      ensureObjectPath(window, keys);
    });

    // Specific initialization for elevenLabs.Activity with a test
    if (window.elevenLabs && !window.elevenLabs.Activity.initialized) {
        window.elevenLabs.Activity = {
            initialized: true,
            timestamp: Date.now(),
            version: '1.0.1'
        };

        // Test assignment to ensure the object is writable
        try {
            window.elevenLabs.Activity.test = 'initialization-test';
            delete window.elevenLabs.Activity.test;
            console.log('✅ `elevenLabs.Activity` initialized and tested successfully.');
        } catch (error) {
            console.error('🔥 Critical Error: `elevenLabs.Activity` is not writable.', error);
            // If this fails, the app is in an unrecoverable state for this feature.
            // We can attempt a hard overwrite.
            Object.defineProperty(window.elevenLabs, 'Activity', {
                value: {
                    initialized: true,
                    timestamp: Date.now(),
                    version: '1.0.1',
                    recovered: true,
                },
                writable: true,
                configurable: true,
            });
        }
    }
    
    console.log('👍 Global object initialization complete.');

  } catch (error) {
    console.error('💥 A critical error occurred during global initialization:', error);
    // Depending on severity, you might want to show a global error message to the user.
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
