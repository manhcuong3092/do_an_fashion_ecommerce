const express = require('express');
const router = express.Router();

const { processPayment, sendStripeApi } = require('../controllers/paymentController');


router.route('/payment/process/stripe').post(processPayment);
router.route('/stripeapi').get(sendStripeApi);

module.exports = router;