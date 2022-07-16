import React, { useState, useEffect } from 'react';

import SearchBar from '../forms/SearchBar';
import JoblyApi from '../api';
import JobCardList from './JobCardList';

/** Show list of all jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * Routed at /jobs
 */

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.debug('JobList useEffect getJobsOnMount');
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(title) {
    let result = await JoblyApi.getJobs(title);
    setJobs(result);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="JobList">
      <SearchBar searchFor={search} />
      <p>List of all jobs:</p>
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="message">
          There are no openings at this time. Please check back later!
        </p>
      )}
    </div>
  );
};

export default JobList;
