import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** User signup form */

const LoginForm = ({ login }) => {
  const INITIAL_STATE = {
    username: 'testuser',
    password: 'password'
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  // const [message, setMessage] = useState('');
  const history = useHistory();

  console.debug(
    'LoginForm',
    'login=',
    typeof login,
    'formData=',
    formData
    // 'formErrors=',
    // formErrors
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
      login(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      // if (res.ok) {
      //   setFormData(INITIAL_STATE);
      //   setMessage('Item added successfully');
      // } else {
      //   setMessage('An error occured');
      // }
      // imperatively redirect to correct page and refresh to see new data
      history.push('/companies');
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="username" className="LoginForm-Label"></label>
      <input
        className="LoginForm-Input"
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <label htmlFor="password" className="LoginForm-Label"></label>
      <input
        className="LoginForm-Input"
        id="password"
        name="password"
        type="text"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        // autoComplete="off"
        // required
      ></input>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
