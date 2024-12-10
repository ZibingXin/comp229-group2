import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../style/authStyle.css'; 

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

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(process.env.BASE_URL + "/auth/register", {
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
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            Agree with our terms of service and privacy policy
          </label>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
