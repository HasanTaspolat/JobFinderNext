'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/components/molecules/sheet";
import {Button} from "@/app/components/atoms/button"
import AppliedJobs from './profileView';

const MobileProfile: React.FC = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button> Applied Jobs</Button>
        </SheetTrigger>
        <SheetContent>
          <AppliedJobs />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileProfile;
