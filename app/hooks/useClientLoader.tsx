'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GlobalLoading from '@/app/components/organisms/globalLoading';

const ClientLoadingHandler: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const handleComplete = () => setLoading(false);
    const timeout = setTimeout(handleComplete, 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <GlobalLoading /> : null;
};

export default ClientLoadingHandler;
