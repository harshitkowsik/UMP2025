const Bus = require('../models/Bus');

const searchBuses = async (req, res) => {
  const { source, destination } = req.query;
  try {

    const sourceRegex = new RegExp('^' + source + '$', 'i'); 
    const destinationRegex = new RegExp('^' + destination + '$', 'i');
    
    const buses = await Bus.find({
      source: sourceRegex,
      destination: destinationRegex,
    }).populate('driver', 'name contactNumber');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchBuses };
