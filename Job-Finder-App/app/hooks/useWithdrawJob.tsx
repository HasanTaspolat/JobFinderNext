import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import withdrawJobService from '@/app/services/jobs/withdrawJob';
import { toast } from 'react-toastify';
import useJobStore from '@/app/stores/useJobStore';
import useAuthStore from '../stores/useAuthStore';

const useWithdrawJob = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const removeAppliedJob = useJobStore((state) => state.removeAppliedJob);
  const removeUserAppliedJob = useAuthStore((state) => state.removeAppliedJob);
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: withdrawJobService,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (_, variables) => {
      removeAppliedJob(variables);
      removeUserAppliedJob(variables);
      queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
      setIsLoading(false);
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Failed to withdraw from the job.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading,
  };
};

export default useWithdrawJob;
