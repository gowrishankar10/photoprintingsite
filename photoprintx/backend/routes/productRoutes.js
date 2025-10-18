const express = require('express');
const { 
  getProducts, 
  getProductById, 
  getPremiumProducts,
  getProductsByCategory,
  searchProducts,
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/')
  .get(getProducts);

router.route('/premium')
  .get(getPremiumProducts);

router.route('/category/:category')
  .get(getProductsByCategory);

router.route('/search')
  .get(searchProducts);

router.route('/:id')
  .get(getProductById);

// Admin routes
router.route('/admin')
  .post(protect, authorize('admin'), createProduct);

router.route('/admin/:id')
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
