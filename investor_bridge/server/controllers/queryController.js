const Query = require('../models/Query');

exports.createQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const query = await Query.create({ question, askedBy: req.user.id });
    res.status(201).json(query);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find().populate('askedBy', 'name role');
    res.json(queries);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
