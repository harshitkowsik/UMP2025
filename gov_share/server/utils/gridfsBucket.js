const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gfsBucket;

mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
  console.log('GridFSBucket initialized');
});

const getBucket = () => {
  if (!gfsBucket) throw new Error('GridFSBucket not initialized');
  return gfsBucket;
};

module.exports = { getBucket };
