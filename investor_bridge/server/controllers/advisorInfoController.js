const AdvisorInfo = require('../models/AdvisorInfo');

// Create/post advisor info
exports.createInfo = async (req, res) => {
  try {
    const { infoText } = req.body;
    const info = await AdvisorInfo.create({
      infoText,
      postedBy: req.user.id
    });
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// List all advisor info
exports.getAllInfos = async (req, res) => {
  try {
    const infos = await AdvisorInfo.find().populate('postedBy', 'name role').sort({ createdAt: -1 });
    res.json(infos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
