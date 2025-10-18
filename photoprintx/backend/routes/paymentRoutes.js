const express = require('express');
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Payment routes
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;
