import { create } from 'zustand';

interface Address {
  details: string;
  city: string;
  country: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  profileImage?: string;
  dateOfBirth?: string;
  address?: Address;
  appliedJobs?: string[]; 
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  removeAppliedJob: (jobId: string) => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
  removeAppliedJob: (jobId) => set((state) => {
    if (!state.user || !state.user.appliedJobs) return state;

    return {
      user: {
        ...state.user,
        appliedJobs: state.user.appliedJobs.filter(id => id !== jobId),
      }
    };
  }),
}));

export default useAuthStore;
