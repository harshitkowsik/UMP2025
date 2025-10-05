const Solution = require('../models/Solution');

exports.createSolution = async (req, res) => {
  try {
    const { solutionText, query } = req.body;
    const solution = await Solution.create({
      solutionText,
      query,
      postedBy: req.user.id
    });
    res.status(201).json(solution);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getSolutionsByQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const solutions = await Solution.find({ query: queryId })
      .populate('postedBy', 'name role');
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
