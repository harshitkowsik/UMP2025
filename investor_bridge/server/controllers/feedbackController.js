const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = await Feedback.create({ name, email, message });
    res.status(201).json({ msg: 'Feedback received', feedback });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
