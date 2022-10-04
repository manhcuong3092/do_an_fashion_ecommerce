const express = require('express');
const router = express.Router();

const { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/categories').get(getAllCategories);
router.route('/category/:id').get(getCategory)
router.route('/admin/category').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);
router.route('/admin/category/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getCategory)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);


module.exports = router;