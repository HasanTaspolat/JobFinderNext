import axios from 'axios';
import { getAuthCookies } from '@/app/utils/auth';
import { toast } from 'react-toastify';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/jobs`;

const withdrawJobService = async (jobId: string): Promise<void> => {
  try {
    const accessToken = getAuthCookies().accessToken;
    await axios.post(`${API_URL}/${jobId}/withdraw`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    toast.success("You have successfully withdrawn from the job.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    throw new Error('Failed to withdraw from the job');
  }
};

export default withdrawJobService;
