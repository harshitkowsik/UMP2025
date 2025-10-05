const mongoose = require('mongoose');

const documentSubSchema = new mongoose.Schema({
  name: { type: String },
  aadhaar: { type: String },
  filename: { type: String },                          
  filepath: { type: String },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadhaar: { type: String },
  profilePic: { type: String },
  profilePicPath: { type: String },
  address: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  documents: [documentSubSchema]  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
