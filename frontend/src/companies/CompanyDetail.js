import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import JoblyApi from '../api';
import JobCardList from '../jobs/JobCardList';

/** Show details on a company */

const CompanyDetail = () => {
  const { handle } = useParams();
  console.debug('CompanyDetail', 'handle=', handle);

  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      let result = await JoblyApi.getCompany(handle);
      setCompany(result);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="CompanyDetail">
      <img src={company.logoUrl} alt="company logo" />
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetail;
