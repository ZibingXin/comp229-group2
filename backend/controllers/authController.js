// /backend/controllers/authController.js

const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for password hashing
const nodemailer = require('nodemailer'); // for sending email

const JWT_SECRET = "123" // secret key for JWT token

const transporter = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: '',
  },
});


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
      return res.status(400).json({ error: 'Does not find user with this email' });
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

    // Return token and username to the client
    res.status(200).json({ token, username: user.username, email: user.email });
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

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Dose not find user with this email' });
    }

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: '15m' }); // token expires in 15 min

    const resetLink = 'http://localhost:3000/reset-password/${resetToken}';
    const mailOptions = {
      from: '',
      to: email,
      subject: 'Password Reset Request',
      text: 'You requested a password reset. Please click the following link to reset your password: ${resetLink}',
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ error: "Invalid token or user not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: "Reset link expired" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

// update user's profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.userId) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      user.email = email;
    }
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
