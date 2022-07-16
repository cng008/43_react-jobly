import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** User signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm
 * Routed as /signup
 */

const SignUpForm = ({ signup }) => {
  const history = useHistory();
  const INITIAL_STATE = {
    username: 'testuser',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@email.com'
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    'SignupForm',
    'signup=',
    typeof signup,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      let result = await signup(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        // imperatively redirect to correct page and refresh to see new data
        history.push('/companies');
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUpForm">
      <h1>Sign Up</h1>
      <form className="SignUpForm-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="SignUpForm-Label">
          Username
        </label>
        <input
          className="SignUpForm-Input"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="password" className="SignUpForm-Label">
          Password
        </label>
        <input
          className="SignUpForm-Input"
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="firstName" className="SignUpForm-Label">
          First Name
        </label>
        <input
          className="SignUpForm-Input"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="lastName" className="SignUpForm-Label">
          Last Name
        </label>
        <input
          className="SignUpForm-Input"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="email" className="SignUpForm-Label">
          Email
        </label>
        <input
          className="SignUpForm-Input"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        ></input>
        <div className="NewItemForm-formErrors">
          {formErrors ? <p>{formErrors}</p> : null}
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
