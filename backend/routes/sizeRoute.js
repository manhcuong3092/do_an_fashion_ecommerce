const express = require('express');
const router = express.Router();

const { getAllSize, createSize } = require('../controllers/sizeController');

router.route('/sizes').get(getAllSize);
router.route('/size').post(createSize);

module.exports = router;