import React, { useState } from 'react';

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

const SearchBar = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  /** Update form fields */
  const handleChange = evt => {
    setSearchTerm(evt.target.value);
  };

  /** Tell parent to filter */
  const handleSubmit = evt => {
    evt.preventDefault();
    // take care of accidentally trying to search for just spaces
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <label htmlFor="search" className="SearchBar-Label"></label>
      <input
        className="SearchBar-Input"
        id="search"
        name="search"
        type="text"
        placeholder="Enter search term"
        value={searchTerm.value}
        onChange={handleChange}
        autocomplete="off"
        // required
      ></input>
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
