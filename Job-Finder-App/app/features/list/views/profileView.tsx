'use client';

import React, { useEffect } from 'react';
import useFetchJobs from '@/app/hooks/useFetchJob';
import Spinner from '@/app/components/atoms/spinner';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import useAuthStore from '@/app/stores/useAuthStore';
import useJobStore from '@/app/stores/useJobStore';
import WithdrawDialog from './withdrawModal';
import { Avatar, AvatarImage } from '@/app/components/molecules/avatar';

const AppliedJobs = () => {
  const { user } = useAuthStore((state) => state);
  const { appliedJobs, addAppliedJob } = useJobStore((state) => state);
  const jobIds = user?.appliedJobs || [];

  const jobQueries = useFetchJobs(jobIds);

  useEffect(() => {
    if (jobQueries.every(query => query.isSuccess)) {
      jobQueries.forEach(query => {
        if (query.isSuccess && !appliedJobs.some(job => job.id === query.data.id)) {
          addAppliedJob(query.data);
        }
      });
    }
  }, [jobQueries, appliedJobs, addAppliedJob]);

  const allLoading = jobQueries.some(query => query.isLoading);
  const allError = jobQueries.some(query => query.isError);

  if (allLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (allError) {
    return <div className='w-full h-full flex items-center justify-center'>Error fetching jobs</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-md border-l-0 lg:border-l overflow-hidden">
      <div className="p-10 h-screen overflow-hidden overflow-y-scroll">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="h-32 w-32 rounded-full flex flex-col space-y-4 items-center justify-center">
            <Avatar className='w-24 h-24'>
              <AvatarImage src={user?.profileImage || 'https://via.placeholder.com/150'} alt="Profile Image" />
            </Avatar>
            <span>{user?.email}</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Applied Jobs</h2>
        <div className="space-y-4">
          {appliedJobs === null ? (
            <div className="flex flex-col items-center">
              <Image src="https://picsum.photos/200" alt="No jobs" width={200} height={200} />
              <p className="mt-4 text-center text-gray-500">You have no applied jobs, for now.</p>
            </div>
          ) : (
            appliedJobs.map((job, index) => (
              <Card key={index} className="p-4 rounded shadow">
                <CardHeader className="flex gap-3">
                  <div className="flex w-full items-center flex-col">
                    <p className="font-semibold">{job.name}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    Company Name: <span className="text-small">{job.companyName}</span>
                  </p>
                  <p>Location: {job.location}</p>
                </CardBody>
                <CardFooter>
                  <div className='border border-primary rounded-md'>
                    <WithdrawDialog jobId={job.id} />
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
