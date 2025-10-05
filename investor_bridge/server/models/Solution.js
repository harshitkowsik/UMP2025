const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  solutionText: { type: String, required: true },
  query: { type: mongoose.Schema.Types.ObjectId, ref: 'Query', required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Solution', SolutionSchema);
