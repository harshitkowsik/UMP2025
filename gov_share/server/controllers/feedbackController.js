const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { email, feedback } = req.body;

  if (!email || !feedback) {
    return res.status(400).json({ message: 'Email and feedback are required.' });
  }

  try {
    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while saving feedback.' });
  }
};
