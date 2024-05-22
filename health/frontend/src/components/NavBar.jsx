import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';

const NavBar = ({ isRegister, toggleForm, isLoggedIn, handleLogout }) => {
  return (
    <nav className="navBar">
      <Link to="/" className="navLink">Home</Link>
      <div className="navRight">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="toggleButton">
            Log Out
          </button>
        ) : (
          <Link to="/auth" className="navLink">
            <button onClick={toggleForm} className="toggleButton">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
