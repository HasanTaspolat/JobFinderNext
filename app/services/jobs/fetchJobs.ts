import axios from 'axios';
import { Job } from '@/app/types';
import { getAuthCookies } from '@/app/utils/auth';

interface JobsMeta {
  total: number;
  page: number;
  perPage: number;
}

interface JobsResponse {
  jobs: Job[];
  meta: JobsMeta;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/jobs";

const getJobs = async (params: Record<string, string | number>): Promise<JobsResponse> => {
  const queryString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'field' || key === 'direction') {
      queryString.append(`orderBy[${key}]`, String(value));
    } else {
      queryString.append(key, String(value));
    }
  });
  
  const accessToken = getAuthCookies().accessToken;
  
  const response = await axios.get(`${API_URL}?${queryString.toString()}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const { data, meta } = response.data;

  return {
    jobs: data,  // Ensure jobs is returned here
    meta: {
      total: meta.total,
      page: meta.page,
      perPage: meta.perPage,
    }
  };
};

export default getJobs;
