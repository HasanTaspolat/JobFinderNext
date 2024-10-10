'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/app/components/molecules/dialog";
import { Button } from "@/app/components/atoms/button";
import { Chip } from '@nextui-org/react';
import applyJobService from '@/app/services/jobs/applyJob';
import { getAuthCookies } from '@/app/utils/auth';
import useJobStore from '@/app/stores/useJobStore';
import Spinner from '@/app/components/atoms/spinner';
import { useToast } from "@/app/hooks/use-toast";
import { Job } from '@/app/types';

interface JobApplyModalProps {
    job: Job;
    isApplied: boolean;
}

const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, isApplied }) => {
    const addAppliedJob = useJobStore((state) => state.addAppliedJob);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleApply = async () => {
        setLoading(true);
        try {
            const accessToken = getAuthCookies().accessToken;
            await applyJobService(job.id, accessToken!);
            addAppliedJob(job);
            toast({
                title: "Application Successful",
                description: `You have successfully applied to the job ${job.name} at ${job.companyName}.`,
            });
        } catch (error) {
            console.error("Failed to apply for the job", error);
            toast({
                title: "Application Failed",
                description: "There was an error applying to the job. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Details</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center text-xl'>Apply Job</DialogTitle>
                </DialogHeader>
                <DialogDescription className='flex flex-col items-start text-lg gap-y-5'>
                    <p><strong>Company Name:</strong> {job.companyName}</p>
                    <p><strong>Job Name:</strong> {job.name}</p>
                    <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Keyword:</strong></p>
                    <div className="flex flex-wrap gap-2">
                        {job.keywords.map((keyword, index) => (
                            <Chip key={index} color="default">{keyword}</Chip>
                        ))}
                    </div>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Job Description:</strong> {job.description}</p>
                </DialogDescription>
                <DialogFooter className='flex flex-row gap-x-4 justify-center items-center md:justify-center sm:justify-center'>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button onClick={handleApply} disabled={isApplied || loading}>
                        {loading ? <Spinner /> : isApplied ? "Applied" : "Apply"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobApplyModal;
