const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  question: { type: String, required: true },
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', QuerySchema);
