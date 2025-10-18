const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderById, downloadPhoto } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// User routes
router.route('/')
  .post(protect, createOrder)
  .get(protect, getUserOrders);

// Admin routes
router.route('/admin')
  .get(protect, authorize('admin'), getAllOrders);

router.route('/admin/:id/status')
  .put(protect, authorize('admin'), updateOrderStatus);

// Get order by ID (user or admin)
router.route('/:id')
  .get(protect, getOrderById);

// Download photo (admin)
router.route('/admin/photo/:publicId')
  .get(protect, authorize('admin'), downloadPhoto);

module.exports = router;
