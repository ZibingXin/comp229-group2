import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {
  // Manage the username state to track the logged-in user
  const [username, setUsername] = useState(null);

  return (
    <Router>
      {/* Pass username to Navbar to dynamically update the UI */}
      <Navbar username={username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route
          path="/login"
          element={
            // Pass the onLogin callback to Login to update username upon login
            <Login onLogin={(user) => setUsername(user.username)} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
