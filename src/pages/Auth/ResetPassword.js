import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", {
        token,
        newPassword,
      });
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error); // Show backend error
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reset Password</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Reset Password
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

export default ResetPassword;
