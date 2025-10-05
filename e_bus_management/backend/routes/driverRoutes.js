const express = require('express');
const router = express.Router();
const { addBus, saveBusDetails, getDriverBusDetails } = require('../controllers/driverController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/bus-details', protect, authorizeRoles('driver'), getDriverBusDetails);

router.post('/add-bus', protect, authorizeRoles('driver'), addBus);

router.post('/bus-details', protect, authorizeRoles('driver'), saveBusDetails);

module.exports = router;
