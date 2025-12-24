const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// Authorize by role
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
