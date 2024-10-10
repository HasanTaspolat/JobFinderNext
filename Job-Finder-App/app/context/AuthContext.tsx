"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthCookies, setAuthCookies, clearAuthCookies } from '@/app/utils/auth';
import fetchUser from '@/app/services/user/fetchUser';
import refreshTokenRequest from '@/app/services/auth/refreshToken';
import useAuthStore from '@/app/stores/useAuthStore';

interface AuthContextProps {
  user: any;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { accessToken, refreshToken } = getAuthCookies();
  const { user, setUser, setTokens, clearAuth } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setTokens: state.setTokens,
    clearAuth: state.clearAuth,
  }));
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      if (accessToken) {
        try {
          const userData = await fetchUser(accessToken);
          setUser(userData);
        } catch (error) {
          if (error instanceof Error && error.message === 'Invalid Access Token' && refreshToken) {
            try {
              const { accessToken: newAccessToken } = await refreshTokenRequest(refreshToken);
              setAuthCookies(newAccessToken, refreshToken);
              setTokens(newAccessToken, refreshToken);
              const userData = await fetchUser(newAccessToken);
              setUser(userData);
            } catch (refreshError) {
              console.error('Failed to refresh access token:', refreshError);
              clearAuth();
              clearAuthCookies();
              router.push('/');
            }
          } else {
            console.error('Failed to fetch user data:', error);
            clearAuth();
            clearAuthCookies();
            router.push('/');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeUser();
  }, [accessToken, refreshToken, setUser, setTokens, clearAuth, router]);

  const logout = () => {
    clearAuth();
    clearAuthCookies();
    localStorage.clear();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
