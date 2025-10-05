const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
      User.findById(decoded.userId)
        .select('-password')
        .then((user) => {
          if (!user) return res.status(401).json({ message: 'User not found' });
          if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
          }
          req.user = user;
          next();
        })
        .catch(() => res.status(500).json({ message: 'Server error' }));
    });
  };
};

module.exports = authMiddleware;
