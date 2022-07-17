import React, { useState, useContext } from 'react';
import { Card, CardBody, Form, Label, Input, Button } from 'reactstrap';

import UserContext from '../UserContext';
import JoblyApi from '../common/api';

/** Edit profile form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user info reloading
 * throughout the site.
 *
 * Confirmation of a successful save.
 *
 * Routed as /profile
 * Routes -> ProfileForm
 */

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

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */
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
    <div className="Profile col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <h1>Profile</h1>
      <Card>
        <CardBody>
          <Form className="ProfileForm-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="ProfileForm-Label">
              Username
            </Label>
            <p>@{currentUser.username}</p>
            <Label htmlFor="firstName" className="ProfileForm-Label">
              First Name
            </Label>
            <Input
              className="ProfileForm-Input"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            ></Input>
            <Label htmlFor="lastName" className="ProfileForm-Label">
              Last Name
            </Label>
            <Input
              className="ProfileForm-Input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            ></Input>
            <Label htmlFor="email" className="ProfileForm-Label">
              Email
            </Label>
            <Input
              className="ProfileForm-Input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            ></Input>
            <Label htmlFor="password" className="ProfileForm-Label">
              Confirm password to make changes:
            </Label>
            <Input
              className="ProfileForm-Input"
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Input>
            <span className="ProfileForm-message">
              {formErrors ? <p>{formErrors}</p> : null}
              {message ? <p>{message}</p> : null}
            </span>
            <Button
              type="submit"
              className="btn btn-lg btn-block"
              color="primary"
              outline
            >
              Save Changes
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileForm;
