const express = require('express');
const router = express.Router();

const { 
  newOrder, 
  getSingleOrder, 
  myOrders, 
  updateOrder, 
  deleteOrder,
  allOrders
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/order').post(newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleOrder)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;