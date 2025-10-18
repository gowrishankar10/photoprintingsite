const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
const config = require('../config/config');
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

// Upload image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'photoprintx/uploads',
      resource_type: 'image'
    });
    
    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Upload multiple images to Cloudinary
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'photoprintx/uploads',
        resource_type: 'image'
      })
    );
    
    const results = await Promise.all(uploadPromises);
    
    const images = results.map(result => ({
      imageUrl: result.secure_url,
      publicId: result.public_id
    }));
    
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages
};
