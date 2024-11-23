import React, { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/forgot-password", {
        email,
      });
      setSuccess("Password reset link sent to your email!");
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Forgot Password</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}
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

export default ForgetPassword;
