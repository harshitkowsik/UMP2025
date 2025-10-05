const User = require('../models/User');
const logger = require('../config/logger');
const fs = require('fs').promises;
const path = require('path');
const { getBucket } = require('../utils/gridfsBucket');

exports.uploadDocument = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newDoc = {
      name: req.file.originalname,
      aadhaar: req.body.aadhaar,
      filename: req.file.filename,  
      filepath: req.file.path,      
      sharedWith: [],
    };

    user.documents.push(newDoc);
    await user.save();

    res.status(201).json(newDoc);
  } catch (error) {
    console.error('Document upload failed:', error);
    res.status(500).json({ message: 'Document upload failed' });
  }
};

exports.listDocuments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('documents.sharedWith', 'name email');
    const ownDocs = user ? user.documents.map(doc => ({
      ...doc.toObject(),
      owner: user._id,
      ownerName: user.name
    })) : [];

    const others = await User.find({
      'documents.sharedWith': userId,
      _id: { $ne: userId }
    }).select('name documents').populate('documents.sharedWith', 'name email');

    let sharedDocs = [];
    others.forEach(otherUser => {
      otherUser.documents.forEach(doc => {
        if (doc.sharedWith.some(u => u._id.toString() === userId)) {
          sharedDocs.push({
            ...doc.toObject(),
            owner: otherUser._id,
            ownerName: otherUser.name
          });
        }
      });
    });

    res.json([...ownDocs, ...sharedDocs]);
  } catch (error) {
    console.error('Failed to retrieve documents:', error);
    res.status(500).json({ message: 'Failed to retrieve documents' });
  }
};

exports.shareDocument = async (req, res) => {
  const { userId: shareWithUserId } = req.body;
  const docId = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const doc = user.documents.id(docId);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    if (doc.sharedWith.includes(shareWithUserId)) {
      return res.status(400).json({ message: 'Already shared with this user' });
    }

    doc.sharedWith.push(shareWithUserId);
    await user.save();

    res.json(doc);
  } catch (error) {
    console.error('Failed to share document:', error);
    res.status(500).json({ message: 'Failed to share document' });
  }
};

exports.updateDocument = async (req, res) => {
  const docId = req.params.id;
  const updateData = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const doc = user.documents.id(docId);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    Object.keys(updateData).forEach(key => {
      doc[key] = updateData[key];
    });

    await user.save();
    res.json(doc);
  } catch (error) {
    console.error('Failed to update document:', error);
    res.status(500).json({ message: 'Failed to update document' });
  }
};

exports.deleteDocument = async (req, res) => {
  const docId = req.params.id;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const doc = user.documents.id(docId);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    // Delete the file from disk
    if (doc.filepath) {
      try {
        await fs.unlink(path.resolve(doc.filepath));
        console.log('Deleted file from disk:', doc.filepath);
      } catch (err) {
        console.error('Error deleting file from disk:', err);
      }
    }

    user.documents = user.documents.filter(d => d._id.toString() !== docId);
    await user.save();

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Failed to delete document:', error);
    res.status(500).json({ message: 'Failed to delete document' });
  }
};


