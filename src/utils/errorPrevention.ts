/**
 * Error Prevention Utilities
 * 
 * Comprehensive safeguards to prevent Activity property errors
 * and other undefined object assignment issues
 */

// Global object initialization with comprehensive error prevention
export function initializeGlobalObjects(): void {
  if (typeof window === 'undefined') return;

  // Initialize ElevenLabs with comprehensive safeguards
  if (!window.elevenLabs) {
    window.elevenLabs = {};
  }

  // Ensure Activity property exists and is writable
  if (!window.elevenLabs.Activity) {
    window.elevenLabs.Activity = {
      initialized: true,
      timestamp: Date.now(),
      version: '1.0.0'
    };
  }

  // Test assignment to ensure it works
  try {
    window.elevenLabs.Activity.test = 'working';
    delete window.elevenLabs.Activity.test;
  } catch (error) {
    console.warn('Activity property test failed, recreating:', error);
    window.elevenLabs.Activity = {
      initialized: true,
      timestamp: Date.now(),
      version: '1.0.0'
    };
  }

  // Initialize other global objects
  const globalObjects = ['agentuity', 'globalState'];
  globalObjects.forEach(objName => {
    if (!(window as any)[objName]) {
      (window as any)[objName] = {};
    }
  });
}

// Safe property assignment utility
export function safeSetProperty(
  target: any,
  property: string,
  value: any,
  fallback: any = {}
): boolean {
  try {
    if (!target) {
      console.warn(`Target object is undefined for property: ${property}`);
      return false;
    }

    if (!target[property]) {
      target[property] = fallback;
    }

    target[property] = value;
    return true;
  } catch (error) {
    console.error(`Failed to set property ${property}:`, error);
    return false;
  }
}

// Safe Activity property assignment
export function safeSetActivity(target: any, value: any): boolean {
  return safeSetProperty(target, 'Activity', value, {
    initialized: true,
    timestamp: Date.now()
  });
}

// Comprehensive object initialization
export function ensureObjectExists(obj: any, path: string[]): any {
  let current: any = obj;
  
  for (const key of path) {
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  
  return current;
}

// Initialize all required global objects
export function initializeAllGlobals(): void {
  initializeGlobalObjects();
  
  // Additional safeguards
  if (typeof window !== 'undefined') {
    // Ensure React is available
    if (!(window as any).React) {
      console.warn('React not found on window object');
    }
    
    // Ensure all global objects are properly initialized
    const requiredGlobals = [
      'elevenLabs',
      'elevenLabs.Activity',
      'agentuity',
      'globalState'
    ];
    
    requiredGlobals.forEach(path => {
      const keys = path.split('.');
      ensureObjectExists(window, keys);
    });
  }
}

// Error boundary for Activity assignments
export function withActivityErrorBoundary<T>(
  fn: () => T,
  fallback: T
): T {
  try {
    return fn();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Activity')) {
      console.warn('Activity property error caught, using fallback:', error);
      return fallback;
    }
    throw error;
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeAllGlobals();
}
