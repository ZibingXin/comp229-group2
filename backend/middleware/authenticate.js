// /backend/middleware/authenticate.js
// This middleware function handles token-based user authentication using JSON Web Tokens (JWT).
// When a request is made to a protected route, this middleware checks for an Authorization header, 
// extracts the token, and verifies it using a secret key (JWT_SECRET).

const jwt = require('jsonwebtoken');
const JWT_SECRET = "123"

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // If the token is valid, the decoded user information is added to the req object, allowing downstream route handlers to access the user's details.
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is missing or invalid, a 401 Unauthorized response is sent back.
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;
