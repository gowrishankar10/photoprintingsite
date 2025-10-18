const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Photo Prints', 'Canvas Prints', 'Photo Books', 'Calendars', 'Frames', 'Albums',
      'Metal Prints', 'Acrylic Prints', 'Bamboo Prints',
      'Album Templates', 'Wedding Albums', 'Birthday Albums', 'Puberty Albums',
      'Gift Printing', 'Mug Printing', 'T-shirt Printing', 'Keychain Printing', 'Engraving Works'
    ]
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  paperTypes: [{
    type: String,
    enum: ['Glossy', 'Matte']
  }],
  imageUrl: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  premiumBadge: {
    type: String,
    enum: ['Perfect Gift', 'Memories Forever', 'Love & Care', 'Special Moments', 'Heartfelt Gift', 'Cherished Memories'],
    default: undefined
  },
  premiumFeatures: [{
    feature: String,
    description: String
  }],
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
