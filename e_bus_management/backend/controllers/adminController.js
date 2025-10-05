const User = require('../models/User');
const Bus = require('../models/Bus');

const createDriver = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Driver already exists' });

    const driver = new User({ name, email, password, role: 'driver', contactNumber });
    await driver.save();

    res.status(201).json({ message: 'Driver account created', driver });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDriversWithBusDetails = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' }, '-password').lean();
    const buses = await Bus.find({ driver: { $in: drivers.map(d => d._id) } }).lean();

    const busMap = {};
    buses.forEach(bus => {
      busMap[bus.driver.toString()] = bus;
    });

    const driversWithBusDetails = drivers.map(driver => {
      return {
        ...driver,
        busDetails: busMap[driver._id.toString()] || null
      };
    });

    res.json(driversWithBusDetails);
  } catch (error) {
    console.error('Error fetching drivers with bus details:', error);
    res.status(500).json({ message: 'Failed to fetch drivers with bus details' });
  }
};

const updateDriverBusDetails = async (req, res) => {
  const { busType, contactNumber, location } = req.body;
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }

    driver.busDetails = { busType, contactNumber, location };
    await driver.save();

    res.json({ message: 'Bus details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bus details' });
  }
};

const deleteDriverAndBus = async (req, res) => {
  const driverId = req.params.id;
  try {
    await User.findByIdAndDelete(driverId);

    await Bus.deleteMany({ driver: driverId });

    res.json({ message: 'Driver and related bus details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete driver', error: error.message });
  }
};

module.exports = { createDriver, getAllDriversWithBusDetails, updateDriverBusDetails, deleteDriverAndBus };
