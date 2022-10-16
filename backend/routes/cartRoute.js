const express = require('express');
const { getCart, newCart, updateCart } = require('../controllers/cartController');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/cart')
  .get(isAuthenticatedUser, getCart)
  .post(isAuthenticatedUser, newCart)
  .put(isAuthenticatedUser, updateCart);


module.exports = router;