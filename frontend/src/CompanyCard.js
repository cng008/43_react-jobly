import React from 'react';
import { Link } from 'react-router-dom';

/** Individual card component for CompanyList.
 * showing simple info about a company on the list */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`}>
      <div className="CompanyCard" id={handle}>
        <img src={logoUrl} alt="company logo" />
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;
