const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createQuery, getQueries } = require('../controllers/queryController');

router.post('/', auth, createQuery);
router.get('/', getQueries);

module.exports = router;
