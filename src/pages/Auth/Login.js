import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../style/authStyle.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const role = isAdmin ? "admin" : "user";
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password, role });
      console.log("Login successful: ", response.data);

      const { token, username } = response.data;

      // Save the token in local storage
      localStorage.setItem('token', token);

      // Call the onLogin callback to update the username in App
      if (onLogin) {
        onLogin({ username });
      }

      // Navigate to the dashboard
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group" style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/forgot-password" className="small-link">
            Forget password?
          </Link>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            As Admin
          </label>
        </div>
        <button type="submit" className="button">
          Sign in
        </button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link to="/register" className="small-link">
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
