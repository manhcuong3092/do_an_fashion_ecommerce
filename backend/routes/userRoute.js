const express = require('express');
const router = express.Router();
const { 
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { allUsers, getUserDetails, updateUser, deleteUser, createUser } = require('../controllers/userController');

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/admin/user').post(isAuthenticatedUser, authorizeRoles('admin'), createUser);
router.route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;