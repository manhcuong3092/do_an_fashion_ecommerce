const express = require('express');
const router = express.Router();

const { getAllSizes, createSize, getSize, updateSize, deleteSize } = require('../controllers/sizeController');

router.route('/sizes').get(getAllSizes);
router.route('/size/:id').get(getSize)
router.route('/admin/size').post(isAuthenticatedUser, authorizeRoles('admin'), createSize);
router.route('/admin/size/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSize)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSize)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSize);


module.exports = router;