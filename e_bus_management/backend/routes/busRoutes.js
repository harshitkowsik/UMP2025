const express = require('express');
const router = express.Router();
const { searchBuses } = require('../controllers/busController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/search', protect, searchBuses);


module.exports = router;
