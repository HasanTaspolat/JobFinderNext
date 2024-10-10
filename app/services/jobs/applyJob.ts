import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/jobs/";

const applyJobService = async (jobId: string, accessToken: string) => {
  const response = await axios.post(`${API_URL}${jobId}/apply`, {}, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default applyJobService;