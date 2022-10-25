const express = require('express');
const { getStatistic } = require('../controllers/statisticController');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/statistic').get(isAuthenticatedUser, authorizeRoles('admin'), getStatistic);


module.exports = router;