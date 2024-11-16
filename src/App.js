import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
