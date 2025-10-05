const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const upload = require('../utils/multer'); 
const { uploadDocument, deleteDocument, shareDocument, listDocuments, updateDocument } = require('../controllers/userDocumentController');

router.post('/upload', auth, upload.single('file'), uploadDocument);

router.get('/', auth, listDocuments);

router.delete('/:id', auth, deleteDocument);

router.post('/:id/share', auth, shareDocument);

router.put('/:id', auth, updateDocument);

router.get('/file/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });
    
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });

module.exports = router;
