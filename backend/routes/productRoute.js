const express = require('express')
const router = express.Router();

const {
  newProduct, getProducts, getSingleProduct, deleteProduct,
  updateProduct, getAllProducts, getProductBySlug, createProductReview,
  getProductReviews, deleteReview, getLatestProducts,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/products/latest').get(getLatestProducts);
router.route('/product/:id').get(getSingleProduct)
router.route('/product/slug/:slug').get(getProductBySlug);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAllProducts);
router.route('/admin/product').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/product/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleProduct)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route('/review').post(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);

module.exports = router;