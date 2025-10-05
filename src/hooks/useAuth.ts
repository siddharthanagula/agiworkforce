import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = async (email?: string) => {
    // Auth0 uses redirect-based login
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
        login_hint: email,
      },
    });
  };

  const signup = async (email?: string) => {
    // Auth0 uses redirect-based signup
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        login_hint: email,
      },
    });
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const getToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    getToken,
  };
}
