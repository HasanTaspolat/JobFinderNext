import { useQuery } from '@tanstack/react-query';
import getJobs from '@/app/services/jobs/fetchJobs';
import { Job } from '../types';

interface JobsMeta {
  total: number;
  page: number;
  perPage: number;
}

interface JobsResponse {
  jobs: Job[];
  meta: JobsMeta;
}

interface FetchJobsParams {
  accessToken: string | undefined;
  page: number;
  filter: { field: string; direction: string } | null;
  search: { field: string; query: string } | null;
  jobsPerPage: number;
}

const fetchJobs = async ({
  accessToken,
  page,
  filter,
  search,
  jobsPerPage,
}: FetchJobsParams): Promise<JobsResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: jobsPerPage,
  };

  if (filter) {
    params['orderBy[field]'] = filter.field;
    params['orderBy[direction]'] = filter.direction;
  }

  if (search && search.query) {
    params['search[field]'] = search.field;
    params['search[query]'] = search.query;
  }

  return getJobs(params);
};

const useFetchJobs = (params: FetchJobsParams) => {
  return useQuery<JobsResponse>({
    queryKey: ['jobs', params.page, params.filter, params.search, params.jobsPerPage],
    queryFn: () => fetchJobs(params),
  });
};

export default useFetchJobs;
