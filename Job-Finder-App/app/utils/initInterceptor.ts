"use client"
import { useEffect } from 'react';
import setupAxiosInterceptors from '@/app/services/interceptor';

const AxiosInterceptorComponent = () => {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return null;
};

export default AxiosInterceptorComponent;
