const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  busName: String,
  busNumber: String,
  busType: String,
  source: String,
  destination: String,
  contactNumber: String,
  location: {
    latitude: Number,
    longitude: Number,
  }
});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
