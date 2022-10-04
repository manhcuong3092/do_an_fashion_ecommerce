const express = require('express');
const router = express.Router();

const { getAllSizes, createSize, getSize, updateSize, deleteSize } = require('../controllers/sizeController');

router.route('/sizes').get(getAllSizes);
router.route('/size').post(createSize);
router.route('/size/:id')
  .get(getSize)
  .put(updateSize)
  .delete(deleteSize);


module.exports = router;