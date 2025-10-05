import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = useCallback(async (email?: string) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'login',
          login_hint: email,
        },
        appState: {
          returnTo: '/dashboard'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [loginWithRedirect]);

  const signup = useCallback(async (email?: string) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          login_hint: email,
        },
        appState: {
          returnTo: '/dashboard'
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }, [loginWithRedirect]);

  const logout = useCallback(() => {
    try {
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [auth0Logout]);

  const getToken = useCallback(async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }, [getAccessTokenSilently]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    getToken,
  };
}