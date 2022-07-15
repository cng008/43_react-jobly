import React, { useState } from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './api';
import './App.css';

import NavBar from './NavBar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('token');
  // const [isLoading, setIsLoading] = useState(true);

  console.debug(
    'App',
    'isLoggedIn=',
    isLoggedIn,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   * */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      JoblyApi.token = token;
      setIsLoggedIn(true);
      // setIsLoading(false);
      // setCurrentUser(username)
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      setIsLoggedIn(true);
      // setIsLoading(false);
      // setCurrentUser(username)
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setToken('token');
  };
  // if (isLoading) {
  //   return <p>Loading &hellip;</p>;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          logout={logout}
        />
        <Routes login={login} signup={signup} />
      </BrowserRouter>
    </div>
  );
};

export default App;
