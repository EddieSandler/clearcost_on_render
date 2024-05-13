import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
      </nav>
    </div>
  );
}

export default Header;
