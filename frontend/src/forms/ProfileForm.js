import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import JoblyApi from '../api';

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const INITIAL_STATE = {
    username: currentUser.username,
    password: '',
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState('');

  console.debug(
    'ProfileForm',
    'currentUser=',
    currentUser,
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
    setFormErrors([]);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
      setMessage('Saved successfully!');
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: '' }));
    setFormErrors([]);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <form className="ProfileForm-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="ProfileForm-Label">
          Username
        </label>
        <p>@{currentUser.username}</p>
        <label htmlFor="firstName" className="ProfileForm-Label">
          First Name
        </label>
        <input
          className="ProfileForm-Input"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        ></input>
        <label htmlFor="lastName" className="ProfileForm-Label">
          Last Name
        </label>
        <input
          className="ProfileForm-Input"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        ></input>
        <label htmlFor="email" className="ProfileForm-Label">
          Email
        </label>
        <input
          className="ProfileForm-Input"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="password" className="ProfileForm-Label">
          Confirm password to make changes:
        </label>
        <input
          className="ProfileForm-Input"
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <button>Save Changes</button>
        <div className="ProfileForm-message">
          {formErrors ? <p>{formErrors}</p> : null}
          {message ? <p>{message}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
