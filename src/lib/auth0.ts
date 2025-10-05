const auth0Config = {
  domain: (import.meta as any).env?.VITE_AUTH0_DOMAIN || 'dev-example.us.auth0.com',
  clientId: (import.meta as any).env?.VITE_AUTH0_CLIENT_ID || 'your-client-id',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: (import.meta as any).env?.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage'
}

export const isAuth0Configured = () => {
  const domain = (import.meta as any).env?.VITE_AUTH0_DOMAIN
  const clientId = (import.meta as any).env?.VITE_AUTH0_CLIENT_ID
  
  return !!(domain && clientId && 
    domain !== 'dev-example.us.auth0.com' && 
    clientId !== 'your-client-id')
}

export const getAuth0Config = () => {
  if (!isAuth0Configured()) {
    console.warn('Auth0 is not properly configured. Please check your environment variables.')
    return null
  }
  return auth0Config
}

export { auth0Config }
