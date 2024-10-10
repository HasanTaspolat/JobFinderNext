'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthCookies } from '@/app/utils/auth';
import useAuthStore from '@/app/stores/useAuthStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = getAuthCookies();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    const checkAuth = () => {
      if (!accessToken) {
        router.push('/');
      } else if (pathname !== '/list') {
        if (user) {
          const { name, surname, phone } = user;
          console.log(name,surname,phone)
          if (name || surname || phone) {
            router.push('/list');
          }
        }
      } else if (pathname === '/list' && user && (!user.name || !user.surname || !user.phone)) {
        router.push('/fulfill-profile');
      }
    };

    checkAuth();
  }, [accessToken, user, router, pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;
