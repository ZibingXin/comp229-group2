import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import axios from 'axios';
import logo from '../img/Library_App_Logo.png';

function Navbar({ username, onLogout }) { // Declare onLogout as a prop
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  console.log("Navbar received username: ", username);

  // Determine if a link is active based on the current path
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const handleLogout = async () => {
    try {
      // Use GET request to match backend route
      await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
  
      // Notify parent component to reset username
      if (onLogout) {
        onLogout(); // Reset username state in the parent component
      }
  
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

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
          <div className="dropdown">
            {/* Combine dropdown-trigger and isActive classes */}
            <Link
              to="/user-dashboard"
              className={`dropdown-trigger ${isActive('/user-dashboard')}`}
            >
              Hi {username}
            </Link>
            <div className="dropdown-menu">
              <Link to="/user-dashboard" className={isActive('/user-dashboard')}>Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className={isActive('/login')}>LOGIN/REGISTER</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
