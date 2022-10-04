const express = require('express');
const router = express.Router();

const { getAllSubscribers, createSubscriber, deleteSubscriber } = require('../controllers/subscriberController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/subscriber').post(createSubscriber);
router.route('/admin/subscribers').get(isAuthenticatedUser, authorizeRoles('admin'), getAllSubscribers);
router.route('/admin/subscriber/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSubscriber);


module.exports = router;