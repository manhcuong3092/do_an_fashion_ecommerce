const express = require('express')
const router = express.Router();

const { 
  newProduct, getProducts, getSingleProduct, deleteProduct, updateProduct, getAllProducts, 
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAllProducts);
router.route('/admin/product').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/product/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleProduct)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;