const Order = require('../models/Order');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Create order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    
    // Create order
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount
    });
    
    const createdOrder = await order.save();
    
    // Populate user details
    await createdOrder.populate('user', 'name email');
    
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    const updatedOrder = await order.save();
    
    // Populate user details
    await updatedOrder.populate('user', 'name email');
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is authorized to view this order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Download uploaded photo (admin)
const downloadPhoto = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Generate signed URL for download
    const downloadUrl = cloudinary.url(publicId, {
      secure: true,
      attachment: true // Forces download
    });
    
    res.json({ downloadUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate download link' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  downloadPhoto
};
