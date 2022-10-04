const express = require('express');
const router = express.Router();

const { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/categories').get(getAllCategories);
router.route('/category').post(createCategory);
router.route('/category/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);


module.exports = router;