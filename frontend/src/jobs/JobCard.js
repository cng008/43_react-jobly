import React from 'react';

/** Individual card component for JobList.
 * Show simple info about a job on the list */

const JobCard = ({ id, title, salary, equity, companyName }) => {
  return (
    <div className="JobCard" key={id}>
      <h3>{title}</h3>
      <h4>{companyName}</h4>
      <p>Salary: {salary ? salary : 'TBA'}</p>
      <p>Equity: {equity ? equity : 0}</p>
    </div>
  );
};

export default JobCard;
