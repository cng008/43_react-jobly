import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from './UserContext';

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return (
      <nav className="NavBar">
        <NavLink exact to="/">
          Jobly
        </NavLink>
        <NavLink exact to="/companies">
          Companies
        </NavLink>
        <NavLink exact to="/jobs">
          Jobs
        </NavLink>
        <NavLink exact to="/profile">
          Profile
        </NavLink>
        <Link to="/" onClick={logout}>
          Log out {currentUser.username}
        </Link>
      </nav>
    );
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Jobly
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/signup">
        Signup
      </NavLink>
    </nav>
  );
};

export default NavBar;
