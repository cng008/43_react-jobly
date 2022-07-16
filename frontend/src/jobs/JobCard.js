import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

/** Individual card component for JobList.
 *
 * Show simple info about a job on the list
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

const JobCard = ({ id, title, salary, equity, companyName }) => {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(() => {
    console.debug('JobCard useEffect update applied status', 'id=', id);
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard" key={id}>
      <h3>{title}</h3>
      <h4>{companyName}</h4>
      <p>Salary: {salary ? salary : 'TBA'}</p>
      <p>Equity: {equity ? equity : 0}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
};

export default JobCard;
