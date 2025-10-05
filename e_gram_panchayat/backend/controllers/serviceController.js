const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const service = new Service({
      title,
      description,
      createdBy: req.user._id,
    });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ status: 'active' });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, requiredFields } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.title = title || service.title;
    service.description = description || service.description;
    service.requiredFields = requiredFields || service.requiredFields;
    await service.save();

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
