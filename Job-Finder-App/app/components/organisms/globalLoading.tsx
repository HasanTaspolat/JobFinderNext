'use client';

import React from 'react';
import Spinner from '@/app/components/atoms/spinner'; // Adjust the import path based on your project structure

const GlobalLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spinner />
    </div>
  );
};

export default GlobalLoading;
