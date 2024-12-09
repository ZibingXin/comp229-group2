import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BorrowedBooks from '../components/BorrowedBooks';
import ReservedBooks from '../components/ReservedBooks';
import { bookService } from '../services/apiService';
import axios from 'axios';
import '../style/dashboard.css';

function UserDashboard({ username, email }) {
  const [userInfo, setUserInfo] = useState({
    username: username || 'Guest',
    email: email || 'Not available',
  });

  const [activeTab, setActiveTab] = useState('Profile'); 
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 JWT
  
    if (!token) {
      alert('You need to log in first.');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:3000/api/auth/update-profile',
        {
          username: userInfo.username,
          email: userInfo.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 在请求头中添加 JWT
          },
          withCredentials: true,
        }
      );
  
      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };
  
  const handlePasswordChange = () => {
    navigate('/reset-password');
  };

  useEffect(() => {
    if (username || email) {
      setUserInfo({ username, email });
    }
  }, [username, email]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <form className="user-form">
            <div>
              <label>Username:</label>
              <br />
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <br />
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <br />
              <button type="button" onClick={handlePasswordChange}>
                Change Password
              </button>
            </div>
            <br />
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        );
      case 'Borrows':
        return <BorrowedBooks />;
      case 'Reservations':
        return <ReservedBooks />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 class='helloUser'>Good Evening! {userInfo.username}!</h2>
      <div className="user-dashboard">
        <div className="sidebar">
          <ul>
            <li
              className={activeTab === 'Profile' ? 'active' : ''}
              onClick={() => handleTabClick('Profile')}
            >
              Profile
            </li>
            <li
              className={activeTab === 'Borrows' ? 'active' : ''}
              onClick={() => handleTabClick('Borrows')}
            >
              Borrows
            </li>
            <li
              className={activeTab === 'Reservations' ? 'active' : ''}
              onClick={() => handleTabClick('Reservations')}
            >
              Reservations
            </li>
          </ul>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default UserDashboard;
