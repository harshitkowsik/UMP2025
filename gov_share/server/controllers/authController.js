const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secure_jwt_secret'; 

exports.register = async (req, res) => {
  try {
    const { name, email, password, aadhaar} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Registration attempt with existing email', { email });
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, aadhaar });
    await user.save();

    logger.info('User registered successfully', { email });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error('Error registering user', { error: error.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login failed: user not found', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.warn('Login failed: incorrect password', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokenPayload = { userId: user._id, email: user.email };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

    logger.info('User logged in successfully', { email });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    logger.error('Error during user login', { error: error.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return false;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score >= 4;
}

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!getPasswordStrength(newPassword)) {
    return res.status(400).json({
      message:
        'Password too weak. It must include 8+ characters, uppercase, lowercase, number and special symbol.',
    });
  }

  try {
    const trimmedToken = token.trim();

    const user = await User.findOne({
      resetPasswordToken: trimmedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('Invalid or expired reset token');
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    console.log('Password reset success for user:', user.email);

    res.json({ message: 'Password reset successful, you can now login.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
