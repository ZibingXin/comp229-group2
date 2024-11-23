import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation for password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validation for agreement checkbox
    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={containerStyle}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
    {error && <p style={errorStyle}>{error}</p>}
    {success && <p style={successStyle}>{success}</p>}
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={formGroupStyle}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={inputStyle}
      />
      </div>
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
      <div style={formGroupStyle}>
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={inputStyle}
      />
      </div>
      <div style={{ marginBottom: "15px", textAlign: "left" }}>
      <label>
        <input
        type="checkbox"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
        style={{ marginRight: "10px" }}
        />
        Agree with our terms of service and privacy policy
      </label>
      </div>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
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
  width: "377px",
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

const errorStyle = {
  color: "red",
  marginBottom: "15px",
  textAlign: "center",
};

const successStyle = {
  color: "green",
  marginBottom: "15px",
  textAlign: "center",
};

export default Register;
