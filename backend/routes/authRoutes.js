// /backend/routes/authRoutes.js
// This file handles user authentication-related requests

const express = require('express');
const { register, login, logout, forgetPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Register a new user
router.post('/login', login);       // Login a user
router.get('/logout', logout);      // Logout a user
router.post('/forgot-password', forgetPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
