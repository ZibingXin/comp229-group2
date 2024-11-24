import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/Library_App_Logo.png';

function Navbar({ username }) {
  const location = useLocation();
  console.log("Navbar received username: ", username);

  // Determine if a link is active based on the current path
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="site-title">ABC Library</h1>
      </div>

      <div className="nav-links">
        <Link to="/" className={isActive('/')}>HOME</Link>
        <Link to="/about" className={isActive('/about')}>ABOUT</Link>
        <Link to="/bookList" className={isActive('/bookList')}>BOOKLIST</Link>
        <Link to="/contact" className={isActive('/contact')}>CONTACT</Link>
        {username ? (
          // Show "Hi {username}" and link to the user dashboard if logged in
          <Link to="/user-dashboard" className={isActive('/user-dashboard')}>
            Hi {username}
          </Link>
        ) : (
          // Show "LOGIN/REGISTER" if not logged in
          <Link to="/login" className={isActive('/login')}>LOGIN/REGISTER</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
