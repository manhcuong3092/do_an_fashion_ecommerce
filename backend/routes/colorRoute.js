const express = require('express');
const router = express.Router();

const { getAllColors, createColor, getColor, updateColor, deleteColor } = require('../controllers/colorController');

router.route('/colors').get(getAllColors);
router.route('/color').post(createColor);
router.route('/color/:id')
  .get(getColor)
  .put(updateColor)
  .delete(deleteColor);


module.exports = router;