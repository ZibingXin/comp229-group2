import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
import SearchBooks from './components/SearchBooks';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  // Fetch user info if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUsername(response.data.username);
          setEmail(response.data.email);
        })
        .catch(() => {
          // Token invalid or expired, clear localStorage
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogin = ({ username, email }) => {
    setUsername(username);
    setEmail(email);
  };

  const handleLogout = () => {
    setUsername(null);
    setEmail(null);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <Router>
        <Navbar username={username} onLogout={handleLogout} />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route 
              path="/user-dashboard" 
              element={<UserDashboard username={username} email={email} />} 
            />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route path="/bookList" element={<Booklist />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path='/searchBooks' element={<SearchBooks/>} />
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
