import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** User signup form */

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
  const [message, setMessage] = useState('');

  console.debug(
    'SignupForm',
    'signup=',
    typeof signup,
    'formData=',
    formData
    // 'formErrors=',
    // formErrors
  );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    let res = await signup(formData);
    try {
      signup(formData);
      // makes a POST request to Api.js and adds corresponding data to database
      if (res.ok) {
        history.push('/companies');
        setFormData(INITIAL_STATE);
        setMessage('Item added successfully');
      } else {
        setMessage('An error occured');
        // setFormErrors(result.errors);
      }
      // imperatively redirect to correct page and refresh to see new data
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
      setMessage(err);
    }
  };

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <label htmlFor="username" className="SignUpForm-Label"></label>
      <input
        className="SignUpForm-Input"
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <label htmlFor="password" className="SignUpForm-Label"></label>
      <input
        className="SignUpForm-Input"
        id="password"
        name="password"
        type="text"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <label htmlFor="firstName" className="SignUpForm-Label"></label>
      <input
        className="SignUpForm-Input"
        id="firstName"
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <label htmlFor="lastName" className="SignUpForm-Label"></label>
      <input
        className="SignUpForm-Input"
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <label htmlFor="email" className="SignUpForm-Label"></label>
      <input
        className="SignUpForm-Input"
        id="email"
        name="email"
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <button>Sign Up</button>
      <div className="NewItemForm-message">
        {message ? <p>{message}</p> : null}
      </div>
    </form>
  );
};

export default SignUpForm;
