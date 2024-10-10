'use client';

import UserProfileForm from '@/app/features/auth/forms/fullFillForm';
import ProtectedRoute from '../components/hoc/protectedRoute';
import GlobalHeader from '../components/organisms/header';

const FullfillProfile = () => {
  return (
    <ProtectedRoute>
    <div className="flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-md w-full max-w-lg">
        <GlobalHeader/>
        <h1 className="text-2xl font-semibold mb-4 text-center">Complete Your Profile</h1>
        <UserProfileForm />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default FullfillProfile;
