import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

/** Show homepage */

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {currentUser ? (
        <h2>Welcome Back, {currentUser.firstName}!</h2>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
