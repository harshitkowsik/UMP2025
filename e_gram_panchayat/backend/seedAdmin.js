const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to your User model

require('dotenv').config();

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digital-e-gram';

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    // Create admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding admin user failed:', err);
    process.exit(1);
  }
}

seedAdmin();
