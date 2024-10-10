import { useQueries } from '@tanstack/react-query';
import fetchJob from '@/app/services/jobs/fetchJob';
import useJobStore from '../stores/useJobStore';
import { getAuthCookies } from '@/app/utils/auth';
import { Job } from '../types';

const useFetchJobs = (jobIds: string[]) => {
  const { accessToken } = getAuthCookies();
  const { jobs, setJobs } = useJobStore();

  const queries = [];
  for (const id of jobIds) {
    queries.push({
      queryKey: ['job', id],
      queryFn: () => fetchJob(id, accessToken!),
      enabled: !jobs.some((job) => job.id === id),
      onSuccess: (data: Job) => {
        setJobs([...jobs, data]);
      },
    });
  }

  return useQueries({ queries });
};

export default useFetchJobs;
