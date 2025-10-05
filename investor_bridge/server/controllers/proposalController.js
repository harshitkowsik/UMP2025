const Proposal = require('../models/Proposal');

exports.createProposal = async (req, res) => {
  try {
    const { title, description, category, type } = req.body;
    const proposal = await Proposal.create({
      title,
      description,
      category,
      type,
      createdBy: req.user.id
    });
    res.status(201).json(proposal);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProposals = async (req, res) => {
  try {
    const type = req.query.type;
  const filter = {};
  if (type) {
    filter.type = type;
  }
  const proposals = await Proposal.find(filter).populate('createdBy').populate('category');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

