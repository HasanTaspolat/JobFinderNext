import axios from 'axios';
import { toast } from 'react-toastify';

const setupAxiosInterceptors = () => {

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
