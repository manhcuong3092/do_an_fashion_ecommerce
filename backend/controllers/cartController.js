const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Cart = require("../models/cart");
const ErrorHandler = require('../utils/errorHandler');

//create new cart => /api/v1/cart
exports.newCart = catchAsyncErrors(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id });
  if(cart) {
    return next(new ErrorHandler(`Giỏ hàng của bạn đã tồn tại.`, 400));
  }
  cart = await Cart.create({
    cartItems: [],
    user: req.user._id
  })

  res.status(200).json({
    success: true,
    cart
  });
});


// get logged user cart => /api/v1/cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate('cartItems.size')
    .populate('cartItems.color')
    .populate('cartItems.product');
  res.status(200).json({
    success: true,
    cart
  })
})

// update cart => /api/v1/cart
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const cartItems = req.body.cartItems;
  let cart = await Cart.findOneAndUpdate({ user: req.user.id }, {cartItems}, {new: true})
    .populate('cartItems.size')
    .populate('cartItems.color')
    .populate('cartItems.product');

  res.status(200).json({
    success: true,
    cart
  })
})
