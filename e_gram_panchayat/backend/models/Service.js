const mongoose = require('mongoose');

const requiredFieldSchema = new mongoose.Schema({
  field: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  options: [String],
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  requiredFields: [requiredFieldSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
