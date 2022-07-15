import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';
import './App.css';

import NavBar from './NavBar';
import UserContext from './UserContext';

const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('token');

  console.debug(
    'App',
    'isLoggedIn=',
    isLoggedIn,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error('App getCurrentUser: problem loading', err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded();
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

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
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      setIsLoggedIn(true);
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout. */
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setToken('token');
  };

  if (infoLoaded) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
