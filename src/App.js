import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Booklist from './pages/Booklist';
import BookDetails from './pages/BookDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {
  // Manage the username state to track the logged-in user
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const handleLogin = ({ username, email }) => {
    setUsername(username);
    setEmail(email);
  };

  const handleLogout = () => {
    setUsername(null);
    setEmail(null);
  };

  console.log('Username:', username);
console.log('Email:', email);


  return (
    <Router>
      {/* Pass username to Navbar to dynamically update the UI */}
      <Navbar username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route 
          path="/user-dashboard" 
          element={<UserDashboard username={username} email={email} />} 
        />
        <Route 
          path="/login" 
          // Pass the onLogin callback to Login to update username upon login
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/bookList" element={<Booklist />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
