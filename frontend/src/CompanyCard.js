import React from 'react';

/** Individual card component for CompanyList.
 * showing simple info about acompany on the list */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <div className="CompanyCard" id={handle}>
      <img src={logoUrl} alt="company logo" />
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default CompanyCard;
