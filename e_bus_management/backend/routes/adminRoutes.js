const express = require('express');
const router = express.Router();
const {
  createDriver,
  getAllDriversWithBusDetails,
  updateDriverBusDetails, deleteDriverAndBus
} = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/create-driver', protect, authorizeRoles('admin'), createDriver);
router.get('/drivers', protect, authorizeRoles('admin'), getAllDriversWithBusDetails);
router.put('/driver/:id/bus-details', protect, authorizeRoles('admin'), updateDriverBusDetails);
router.delete('/driver/:id', protect, authorizeRoles('admin'), deleteDriverAndBus);

module.exports = router;
