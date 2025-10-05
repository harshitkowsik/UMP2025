const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { getBucket } = require('../utils/gridfsBucket');
const { getProfile, updateProfile, getUserByEmail } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware, getProfile);

router.put('/me', authMiddleware, upload.single('profilePic'), updateProfile);

router.get('/by-email/:email', authMiddleware, getUserByEmail);

router.get('/profile-pic/:filename', (req, res) => {
  const gfsBucket = getBucket();
  gfsBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!files || files.length === 0) return res.status(404).json({ error: 'No file exists' });

    const file = files[0];
    if (file.contentType !== 'image/jpeg' && file.contentType !== 'image/png') {
      return res.status(400).json({ error: 'Not an image' });
    }

    const downloadStream = gfsBucket.openDownloadStreamByName(req.params.filename);
    downloadStream.on('error', () => {
      res.status(500).json({ error: 'Error reading file' });
    });
    downloadStream.pipe(res);
  });
});

module.exports = router;
