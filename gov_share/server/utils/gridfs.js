const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const mongoose = require('mongoose');

let uploadPromise;

const initGridFsStorage = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.once('open', () => {
      const storage = new GridFsStorage({
        db: mongoose.connection.db,
        file: (req, file) => ({
          filename: file.originalname,
          bucketName: 'uploads',
        }),
      });
      const upload = multer({ storage });
      resolve(upload);
    });

    // Optionally handle connection error
    mongoose.connection.once('error', (err) => {
      reject(err);
    });
  });
}

uploadPromise = initGridFsStorage();

module.exports = { uploadPromise };
