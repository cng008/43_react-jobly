import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Profile from './Profile';

const Routes = ({ login, signup }) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignUpForm signup={signup} />
        </Route>

        <Route exact path="/companies">
          <CompanyList />
        </Route>

        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>

        <Route exact path="/jobs">
          <JobList />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
