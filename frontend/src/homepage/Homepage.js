import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import UserContext from '../UserContext';
import './Homepage.css';

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routes -> Homepage
 *
 * Routed at /
 */

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <h1 className="mb-4 font-weight-bold">Jobly</h1>
      <h3 className="mb-4 font-weight-light">
        All the jobs in one, convenient place.
      </h3>
      {currentUser ? (
        <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
      ) : (
        <div>
          <Link to="/login">
            <Button color="primary">Login</Button>
          </Link>{' '}
          <Link to="/signup">
            <Button color="primary">Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
