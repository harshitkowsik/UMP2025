const express = require('express');
const router = express.Router();
const { createService, getServices, updateService, deleteService} = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/', authMiddleware(['admin', 'staff']), createService); 

router.put('/:id', authMiddleware(['admin', 'staff']), updateService);
router.delete('/:id', authMiddleware(['admin', 'staff']), deleteService);

module.exports = router;
