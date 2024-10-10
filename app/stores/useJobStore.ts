import {create} from 'zustand';
import { Job } from '../types';

interface JobState {
  jobs: Job[];
  appliedJobs: Job[];
  setJobs: (jobs: Job[]) => void;
  setAppliedJobs: (jobs: Job[]) => void;
  addAppliedJob: (job: Job) => void;
  removeAppliedJob: (jobId: string) => void;
}

const useJobStore = create<JobState>((set) => ({
  jobs: [],
  appliedJobs: [],
  setJobs: (jobs) => set({ jobs }),
  setAppliedJobs: (jobs) => set({ appliedJobs: jobs }),
  addAppliedJob: (job) => set((state) => ({ appliedJobs: [...state.appliedJobs, job] })),
  removeAppliedJob: (jobId) => set((state) => ({
    appliedJobs: state.appliedJobs.filter(job => job.id !== jobId),
  })),
}));

export default useJobStore;
