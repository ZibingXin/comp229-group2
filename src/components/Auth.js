import React, { useState } from 'react';
import { authService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await authService.login({ email, password });
        setMessage('Login successful!');

        // Redirect based on the selected role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        const response = await authService.register({ email, password, role });
        setMessage('Registration successful!');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Auth;
