const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCategories, createCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', auth, createCategory);

module.exports = router;
