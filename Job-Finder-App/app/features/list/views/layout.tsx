'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import useFetchJobs from '@/app/hooks/useFetchJobs';
import useJobsStore from '@/app/stores/useJobsStore';
import { getAuthCookies } from '@/app/utils/auth';
import { Pagination, Image } from '@nextui-org/react';
import Jobs from './jobs';
import Spinner from '@/app/components/atoms/spinner';
import Filter from './filter';
import Search from './search';
import JobsPerPage from './pageCount';

function JobsLayout() {
  const searchParams = useSearchParams();
  const { accessToken } = getAuthCookies();
  const { setJobs } = useJobsStore((state) => ({
    setJobs: state.setJobs,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<{ field: string, direction: string } | null>(null);
  const [search, setSearch] = useState<{ field: string, query: string } | null>(null);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') as string) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const { data, isLoading } = useFetchJobs({
    accessToken,
    page: currentPage,
    filter,
    search,
    jobsPerPage,
  });

  useEffect(() => {
    if (data) {
      setJobs(data.jobs, {
        total: data.meta.total,
        page: data.meta.page,
        perPage: data.meta.perPage,
      });
    }
  }, [data, setJobs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.history.pushState(null, '', `?page=${page}`);
  };

  const handleFilterChange = (newFilter: { field: string, direction: string } | null) => {
    setFilter(newFilter);
    window.history.pushState(null, '', `?page=${currentPage}`);
  };

  const handleSearchChange = (search: { field: string, query: string }) => {
    setSearch(search);
    window.history.pushState(null, '', `?page=1`);
    setCurrentPage(1);
  };

  const handleJobsPerPageChange = (jobsPerPage: number) => {
    setJobsPerPage(jobsPerPage);
    window.history.pushState(null, '', `?page=1`);
    setCurrentPage(1); // Reset to first page when changing jobs per page
  };

  return (
    <div className="flex flex-col justify-start">
      <div className='w-full max-w-5xl mx-auto my-4 p-4 flex items-center items-baseline md:space-x-4 space-x-0 flex-wrap space-y-4'>
        <Filter onFilterChange={handleFilterChange} />
        <Search onSearch={handleSearchChange} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {data && data.jobs.length === 0 ? (
            <div className="flex flex-col items-center">
              <Image src="https://picsum.photos/200" alt="No jobs" width={200} height={200} />
              <p className="mt-4 text-center text-gray-500">There are no search results.</p>
            </div>
          ) : (
            <>
              {data && <Jobs jobs={data.jobs} />}
              <div className='flex flex-col flex-wrap w-full items-start md:items-center justify-center md:space-x-12 md:flex-row mb-4'>
                <Pagination
                  showControls
                  total={data ? Math.ceil(data.meta.total / jobsPerPage) : 1}
                  initialPage={currentPage}
                  dotsJump={1}
                  onChange={handlePageChange}
                  className="flex justify-center max-w-xs mx-auto my-5 md:mx-0 overflow-hidden md:overflow-visible p-0"
                />
                 <JobsPerPage jobsPerPage={jobsPerPage} onChange={handleJobsPerPageChange} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default JobsLayout;