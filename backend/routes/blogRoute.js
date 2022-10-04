const express = require('express');
const router = express.Router();

const { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/blogs').get(getAllBlogs);
router.route('/blog/:id').get(getBlog)
router.route('/admin/blog').post(isAuthenticatedUser, authorizeRoles('admin'), createBlog);
router.route('/admin/blog/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getBlog)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog);


module.exports = router;