import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

// Placeholders - in real app, these come from environment variables
const CLIENT_ID = 'YOUR_MOBILE_CLIENT_ID';
const TENANT_ID = 'YOUR_TENANT_ID';
const API_SCOPE = 'api://YOUR_API_CLIENT_ID/access_as_user';

const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['openid', 'profile', 'email', 'offline_access', API_SCOPE],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'jatt-mobile',
      }),
    },
    discovery,
  );

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setToken(access_token);
      SecureStore.setItemAsync('userToken', access_token);
    }
  }, [response]);

  const login = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
    setUser(null);
  }, []);

  return {
    token,
    user,
    login,
    logout,
    ready: !!request,
  };
};
