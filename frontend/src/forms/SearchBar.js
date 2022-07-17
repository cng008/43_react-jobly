import React, { useState } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';

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
    <div className="SearchForm my-4">
      <Form className="SearchBar form-inline" onSubmit={handleSubmit}>
        <Label htmlFor="search" className="SearchBar-Label"></Label>
        <Input
          className="SearchBar-Input form-control form-control-lg flex-grow-1"
          id="search"
          name="search"
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}
          autoComplete="off"
          // required
        ></Input>
        <Button className="btn-lg" color="primary">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
