const express = require('express');
const router = express.Router();
const { createStaffUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/staff', authMiddleware(['admin']), createStaffUser);

module.exports = router;
