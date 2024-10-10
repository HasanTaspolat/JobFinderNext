'use client';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/app/components/molecules/dropdown-menu';
import { Button } from '@/app/components/atoms/button';

interface JobsPerPageProps {
  jobsPerPage: number;
  onChange: (jobsPerPage: number) => void;
}

const JobsPerPage: React.FC<JobsPerPageProps> = ({ jobsPerPage, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(jobsPerPage);

  useEffect(() => {
    setSelectedValue(jobsPerPage);
  }, [jobsPerPage]);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    onChange(value);
  };

  const jobOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  return (
    <div className="flex items-center ml-8 sm:mb-4 md:mb-0">
      <span className='mr-2'>Show: </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedValue}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={selectedValue.toString()} onValueChange={(value) => handleSelect(Number(value))}>
            {jobOptions.map((option) => (
              <DropdownMenuRadioItem key={option} value={option.toString()}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default JobsPerPage;
