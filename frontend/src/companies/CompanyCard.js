import React from 'react';
import { Link } from 'react-router-dom';

/** Show simple information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`}>
      <div className="CompanyCard" id={handle}>
        {logoUrl ? <img src={logoUrl} alt="company logo" /> : null}
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;
