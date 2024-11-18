// /backend/controllers/authController.js

const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for password hashing

const JWT_SECRET = "123" // secret key for JWT token

// register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    // user's password is hashed before saving to the database
    await user.save(); 
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ message: 'User registered successfully -- Token:' + token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// login a user
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Dose not find user with this email' });
    }
    const isMatch = await bcrypt.compare(password, user.password); // compare password with hashed password
    if (!isMatch) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    const roleMatch = user.role === role;
    if (!roleMatch) {
      return res.status(400).json({ error: 'Wrong role' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h', // token expires in 1 hour
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// logout a user
exports.logout = (req, res) => {
  try {
    res.clearCookie('jwt'); // clear JWT token from cookie
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};