const express = require('express')
const router = express.Router();

const { 
  newProduct, getProducts, getSingleProduct, deleteProduct, updateProduct, 
} = require('../controllers/productController');

router.route('/product').post(newProduct);
router.route('/products').get(getProducts);
router.route('/product/:id')
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;