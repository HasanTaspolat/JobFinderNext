import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/app/components/molecules/dialog";
import { Button } from "@/app/components/atoms/button";
import useWithdrawJob from '@/app/hooks/useWithdrawJob';
import Spinner from "@/app/components/atoms/spinner";

interface WithdrawDialogProps {
  jobId: string;
}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ jobId }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { mutate, isLoading } = useWithdrawJob(() => setIsDialogOpen(false)); // Close dialog on success

  const handleWithdraw = () => {
    mutate(jobId);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Withdraw</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw from Job</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to withdraw from this job?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleWithdraw} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Withdraw"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
