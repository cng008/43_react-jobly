import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, currentUser, logout }) => {
  if (isLoggedIn) {
    return (
      <nav className="NavBar">
        <NavLink exact to="/">
          Home
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
          Log out {currentUser}
        </Link>
      </nav>
    );
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Home
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
