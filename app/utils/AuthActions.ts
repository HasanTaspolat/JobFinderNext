import  useAuthStore  from '@/app/stores/useAuthStore';
import { setAuthCookies } from '@/app/utils/auth';

interface User {
  id: string;
  email: string;
  profileImage: string;
}

export const setAuthData = (user: User, accessToken: string, refreshToken: string) => {
  const setUser = useAuthStore.getState().setUser;
  const setTokens = useAuthStore.getState().setTokens;
  
  setUser(user);
  setTokens(accessToken, refreshToken);
  setAuthCookies(accessToken, refreshToken);
};
