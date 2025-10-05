const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/profile', authMiddleware(), (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, your role is ${req.user.role}` });
});

router.put('/profile', authMiddleware(), async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findById(req.user._id);
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
