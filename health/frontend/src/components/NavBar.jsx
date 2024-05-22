import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css'


const NavBar = ({ isRegister, toggleForm }) => {
  return (
    <nav className="navBar">
      <Link to="/" className="navLink">Home</Link>
      <Link to="/compare" className="navLink"><button className="navButton">Compare</button></Link>
      <div className="navRight">
        <Link to="/auth" className="navLink"><button className="navButton">Sign Up / Sign In</button></Link>
        <button onClick={toggleForm} className="toggleButton">
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
