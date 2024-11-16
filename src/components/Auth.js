import React, { useState } from 'react';
import { authService } from '../services/apiService'; 

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        const response = await authService.login({ email, password });
        setMessage(`Login successful! Token: ${response.data.token}`);
      } else {
        // Registration logic
        const response = await authService.register({ username, email, password });
        setMessage(`Registration successful! Message: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
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
