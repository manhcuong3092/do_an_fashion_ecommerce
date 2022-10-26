const express = require('express');
const router = express.Router();

const { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog, getBlogs, getBlogBySlug, getLatestBlogs } = require('../controllers/blogController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/blogs').get(getBlogs);
router.route('/blogs/latest').get(getLatestBlogs);
router.route('/blog/:slug').get(getBlogBySlug)

router.route('/admin/blogs').get(getAllBlogs);
router.route('/admin/blog').post(isAuthenticatedUser, authorizeRoles('admin'), createBlog);
router.route('/admin/blog/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getBlog)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog);


module.exports = router;