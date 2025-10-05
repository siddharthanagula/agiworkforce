import type { Auth0ProviderOptions } from '@auth0/auth0-react';

// Check if Auth0 is properly configured
const isAuth0Configured = () => {
  return !!(
    import.meta.env.VITE_AUTH0_DOMAIN && 
    import.meta.env.VITE_AUTH0_CLIENT_ID
  );
};

export const auth0Config: Auth0ProviderOptions = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'placeholder.auth0.com',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'placeholder-client-id',
  authorizationParams: {
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email',
  },
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  // Add proper error handling
  onRedirectCallback: (appState) => {
    // Handle redirect after login
    window.location.replace(
      appState?.returnTo || window.location.pathname
    );
  },
};

export { isAuth0Configured };
