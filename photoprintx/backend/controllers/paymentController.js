const Razorpay = require('razorpay');
const Order = require('../models/Order');
const config = require('../config/config');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret
});

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || Date.now().toString()
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    
    // Verify payment signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');
    
    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }
    
    // Update order with payment details
    const order = await Order.findOne({ 'payment.razorpayOrderId': razorpayOrderId });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.payment.razorpayPaymentId = razorpayPaymentId;
    order.payment.razorpaySignature = razorpaySignature;
    order.status = 'processing';
    
    await order.save();
    
    res.json({ message: 'Payment verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment
};
