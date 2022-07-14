import React, { useState, useEffect } from 'react';

import SearchBar from './SearchBar';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';

/** showing the list of all companies */

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesOnMount() {
    console.debug('CompanyList useEffect getCompaniesOnMount');
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  return (
    <div className="CompanyList">
      <SearchBar searchFor={search} />
      <p>List of all companies:</p>
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="message">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default CompanyList;
