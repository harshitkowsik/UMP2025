const express = require('express');
const router = express.Router();
const {
  applyForService,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware(), async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }
    return getAllApplications(req, res);
  });

router.post('/', authMiddleware(), applyForService);

router.get('/my-applications', authMiddleware(), getUserApplications);

router.put('/:id/status', authMiddleware(), updateApplicationStatus); 
module.exports = router;
