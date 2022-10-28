const express = require('express');
const router = express.Router();

const { getAllCategories, createCategory, getCategory, updateCategory, 
  deleteCategory, getCategoryBySlug } = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/categories').get(getAllCategories);
router.route('/category/:id').get(getCategory);
router.route('/category/slug/:slug').get(getCategoryBySlug);
router.route('/admin/category').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);
router.route('/admin/category/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getCategory)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);


module.exports = router;