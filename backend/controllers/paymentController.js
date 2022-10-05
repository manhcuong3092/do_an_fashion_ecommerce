const catchAsyncError = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'vnd',
    metadata: { integration_check: 'accept_a_payment' }
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret
  })
})

//Send stripe apikey => /api/v1/payment/stripeapi
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY
  })
})