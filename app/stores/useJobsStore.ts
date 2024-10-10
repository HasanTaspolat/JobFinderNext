import create from 'zustand';
import { Job } from '../types';

interface JobsMeta {
  total: number;
  page: number;
  perPage: number;
}

interface JobsState {
  jobs: Job[];
  meta: JobsMeta | null;
  setJobs: (jobs: Job[], meta: JobsMeta) => void;
  clearJobs: () => void;
}

const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  meta: null,
  setJobs: (jobs, meta) => set(() => ({ jobs, meta })),
  clearJobs: () => set(() => ({ jobs: [], meta: null })),
}));

export default useJobsStore;
