const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createLoan, getAllLoans } = require('../controllers/loanController');

router.post('/', auth, createLoan);
router.get('/', getAllLoans);

module.exports = router;
