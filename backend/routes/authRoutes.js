// /backend/routes/authRoutes.js
// This file handles user authentication-related requests

const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Register a new user
router.post('/login', login);       // Login a user
router.get('/logout', logout);      // Logout a user

module.exports = router;
