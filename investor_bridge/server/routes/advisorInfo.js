const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createInfo, getAllInfos } = require('../controllers/advisorInfoController');

router.post('/', auth, createInfo);
router.get('/', getAllInfos);

module.exports = router;
