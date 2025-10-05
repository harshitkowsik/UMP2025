const Application = require('../models/Application');

exports.applyForService = async (req, res) => {
  try {
    const { serviceId, applicationData } = req.body;
    console.log('Application data received:', applicationData);
    const application = new Application({
      user: req.user._id,
      service: serviceId,
      applicationData,
    });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('service');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('user')    
      .populate('service'); 
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createApplication = async (req, res) => {
  const { serviceId, applicationData } = req.body;

  try {

    const application = new Application({
      user: req.user._id,
      service: serviceId,
      applicationData,
      status: 'pending',
    });

    await application.save();

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
