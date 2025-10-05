const Bus = require('../models/Bus');
const Driver = require('../models/User');

const addBus = async (req, res) => {
  const { busName, busNumber, busType, source, destination, currentLocation, contactNumber } = req.body;
  try {
    const exists = await Bus.findOne({ busNumber });
    if (exists) return res.status(400).json({ message: 'Bus number already exists' });

    const bus = new Bus({ busName, busNumber, busType, source, destination, currentLocation, contactNumber, driver: req.user._id });
    await bus.save();

    res.status(201).json({ message: 'Bus added successfully', bus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveBusDetails = async (req, res) => {
  const { busName, busNumber, busType, contactNumber, source, destination, latitude, longitude } = req.body;
  
  const driverId = req.user._id; 

  if (!busType || !contactNumber || !latitude || !longitude || !busName || !busNumber || !source || !destination) {
    return res.status(400).json({ message: 'Please provide all details' });
  }

  try {
    let bus = await Bus.findOne({ driver: driverId });

    if (bus) {
      bus.busName = busName;
      bus.busNumber = busNumber;
      bus.busType = busType;
      bus.contactNumber = contactNumber;
      bus.source = source;
      bus.destination = destination;
      bus.location = { latitude, longitude };
    } else {
      bus = new Bus({
        driver: driverId,
        busName,
        busNumber,
        busType,
        contactNumber,
        source,
        destination,
        location: { latitude, longitude }
      });
    }

    await bus.save();

    res.status(200).json({ message: 'Bus details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDriverBusDetails = async (req, res) => {
  try {
    const driverId = req.user._id;
    console.log('Fetching bus details for driver:', driverId);
    const busDetails = await Bus.findOne({ driver: driverId });
    console.log('Bus details found:', busDetails);
    if (busDetails) {
      res.json(busDetails);
    } else {
      res.status(404).json({ message: 'Bus details not found' });
    }
  } catch (error) {
    console.error('Error fetching bus details:', error);
    res.status(500).json({ message: 'Server error fetching bus details' });
  }
};

module.exports = { addBus, saveBusDetails, getDriverBusDetails };
