'use client';
import { Suspense } from 'react';
import ProtectedRoute from "../components/hoc/protectedRoute";
import GlobalHeader from "../components/organisms/header";
import JobsLayout from "../features/list/views/layout";
import AppliedJobs from "../features/list/views/profileView";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ListPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <div className="flex justify-center mx-auto">
          <div className="flex flex-col w-full justify-start overflow-hidden max-w-5xl">
            <GlobalHeader />
            <Suspense fallback={<div>Loading jobs...</div>}>
              <JobsLayout />
            </Suspense>
          </div>
          <div className='hidden lg:block w-full max-w-md'>
          <AppliedJobs />
          </div>
        </div>
      </ProtectedRoute>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
