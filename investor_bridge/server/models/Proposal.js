const mongoose = require('mongoose');
const ProposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['business', 'investor', 'loan', 'solution'], required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Proposal', ProposalSchema);
