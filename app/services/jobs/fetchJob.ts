import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/jobs/";

const fetchJob = async (id: string, accessToken: string) => {
  const response = await axios.get(`${API_URL}${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  });
  return response.data;
};

export default fetchJob;