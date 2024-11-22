
import React, { useState } from 'react';
//import { authService } from '../services/apiService';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const role = isAdmin ? "admin" : "user";
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password, role });
      console.log("Login successful: ", response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      // to home page or to profile page
      navigate("/");
    }catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ ...formGroupStyle, display: "flex", justifyContent: "space-between" }}>
          <Link to="/forgot-password" style={smallLinkStyle}>
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
        <button type="submit" style={buttonStyle}>
          Sign in
        </button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link to="/register" style={smallLinkStyle}>
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  backgroundColor: "#f7fdfd",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};
  
const formGroupStyle = {
  marginBottom: "15px",
  textAlign: "left",
};
  
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
};
  
const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
  
const smallLinkStyle = {
  fontSize: "0.9rem",
  textDecoration: "none",
  color: "#007bff",
};

const errorStyle = {
  color: "red",
  marginBottom: "15px",
  textAlign: "center",
};

export default Login;