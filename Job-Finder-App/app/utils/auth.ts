import Cookies from "js-cookie";
import useAuthStore from "@/app/stores/useAuthStore"
import refreshTokenRequest from '../services/auth/refreshToken';

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, { expires: 1 });
  Cookies.set('refreshToken', refreshToken, { expires: 7 });
};

export const getAuthCookies = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  return { accessToken, refreshToken };
};

export const clearAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  try {
    const { accessToken } = await refreshTokenRequest(refreshToken);

    const setTokens = useAuthStore.getState().setTokens;
    setTokens(accessToken, refreshToken);
    Cookies.set('accessToken', accessToken, { expires: 1 });

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};
