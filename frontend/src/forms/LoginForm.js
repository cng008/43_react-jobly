import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** User signup form */

const LoginForm = ({ login }) => {
  const history = useHistory();
  const INITIAL_STATE = {
    username: 'testuser',
    password: 'password'
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    'LoginForm',
    'login=',
    typeof login,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  /** Update form fields */

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      let result = await login(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        history.push('/companies');
      } else {
        setFormErrors(result.errors);
      }
      // imperatively redirect to correct page and refresh to see new data
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form className="LoginForm-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="LoginForm-Label">
          Username
        </label>
        <input
          className="LoginForm-Input"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="password" className="LoginForm-Label">
          Password
        </label>
        <input
          className="LoginForm-Input"
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <div className="NewItemForm-message">
          {formErrors ? <p>{formErrors}</p> : null}
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
