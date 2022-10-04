const express = require('express');
const router = express.Router();

const { getAllColors, createColor, getColor, updateColor, deleteColor } = require('../controllers/colorController');

router.route('/colors').get(getAllColors);
router.route('/color/:id').get(getColor)
router.route('/admin/color').post(isAuthenticatedUser, authorizeRoles('admin'), createColor);
router.route('/admin/color/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getColor)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateColor)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteColor);


module.exports = router;