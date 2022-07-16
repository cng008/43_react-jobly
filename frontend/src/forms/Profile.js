import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../UserContext';

/** Edit user form */

const Profile = ({ update }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const INITIAL_STATE = {
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  // const [message, setMessage] = useState('');

  console.debug(
    'Profile',
    'update=',
    typeof update,
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
    let res = await update(formData);
    try {
      update(formData);
      // makes a POST request to Api.js and adds corresponding data to database
      if (res.ok) {
        history.push('/companies');
        setFormData(INITIAL_STATE);
        // setMessage('Item added successfully');
      } else {
        // setMessage('An error occured');
        // setFormErrors(result.errors);
      }
      // imperatively redirect to correct page and refresh to see new data
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
      // setMessage(err);
    }
  };

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <form className="Profile-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="Profile-Label">
          Username
        </label>
        <p>{currentUser.username}</p>
        <label htmlFor="firstName" className="Profile-Label">
          First Name
        </label>
        <input
          className="Profile-Input"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          // autoComplete="off"
          // required
        ></input>
        <label htmlFor="lastName" className="Profile-Label">
          Last Name
        </label>
        <input
          className="Profile-Input"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          // autoComplete="off"
          // required
        ></input>
        <label htmlFor="email" className="Profile-Label">
          Email
        </label>
        <input
          className="Profile-Input"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          // autoComplete="off"
          // required
        ></input>
        <label htmlFor="password" className="Profile-Label">
          Confirm password to make changes:
        </label>
        <input
          className="Profile-Input"
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          // autoComplete="off"
          // required
        ></input>
        <button>Save Changes</button>
        {/* <div className="NewItemForm-message">
          {message ? <p>{message}</p> : null}
        </div> */}
      </form>
    </div>
  );
};

export default Profile;
