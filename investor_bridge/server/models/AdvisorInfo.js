const mongoose = require('mongoose');

const AdvisorInfoSchema = new mongoose.Schema({
  infoText: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdvisorInfo', AdvisorInfoSchema);
