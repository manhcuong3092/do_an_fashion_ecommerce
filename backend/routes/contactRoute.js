const express = require('express');
const router = express.Router();

const { getAllContacts, createContact, getContact, deleteContact } = require('../controllers/contactController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/contact').post(createContact);
router.route('/admin/contacts').get(isAuthenticatedUser, authorizeRoles('admin'), getAllContacts);
router.route('/admin/contact/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getContact)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteContact);


module.exports = router;