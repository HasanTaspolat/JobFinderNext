import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Image,
} from '@nextui-org/react';
import JobApplyModal from './jobDialog';
import WithdrawDialog from './withdrawModal';
import { Job } from '@/app/types';
import useJobStore from '@/app/stores/useJobStore';

interface JobsPageProps {
  jobs: Job[];
}

const Jobs: React.FC<JobsPageProps> = ({ jobs }) => {
  const { appliedJobs } = useJobStore((state) => state);

  return (
    <div className="container mx-auto px-4 h-auto max-h-[70vh] overflow-scroll overflow-x-hidden">
      <ul>
        {jobs.map((job) => {
          const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job.id);
          return (
            <li key={job.id} className="mb-6">
              <Card className="w-full max-w-5xl mx-auto job-listing">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="random image"
                    height={40}
                    radius="sm"
                    src={`https://picsum.photos/200?random=${job.id}`}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg">{job.companyName} - {job.name}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className='max-w-2xl'>{job.description}</p>
                  <p className="my-2 text-base text-gray-300">
                    Location: <span className='text-base'>{job.location}</span>
                  </p>
                  <p className="my-2 text-base text-gray-300">
                    Salary: <span className='text-green-500 font-bold ml-4'>{job.salary}$</span>
                  </p>
                  <div className="flex flex-wrap gap-2 my-1">
                    {job.keywords.map((keyword, index) => (
                      <Chip key={index} color="default" radius='sm'>
                        {keyword}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className='space-x-4'>
                  <JobApplyModal job={job} isApplied={isApplied} />
                  {isApplied && <WithdrawDialog jobId={job.id} />}
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Jobs;
