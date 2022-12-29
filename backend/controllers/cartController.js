const { default: mongoose } = require("mongoose");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const ErrorHandler = require('../utils/errorHandler');

//create new cart => /api/v1/cart
exports.newCart = catchAsyncErrors(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    return next(new ErrorHandler(`Giỏ hàng của bạn đã tồn tại.`, 400));
  }
  cart = await Cart.create({
    user: req.user._id
  })

  res.status(200).json({
    success: true,
    cart: { ...cart, cartItems: [] }
  });
});


// get logged user cart => /api/v1/cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
  let userCart = await Cart.findOne({ user: req.user._id });
  if (!userCart) {
    return next(new ErrorHandler('Không tìm thấy giỏ hàng', 404));
  }

  let cart = await Cart.findByUser(req.user._id);

  if (cart.length === 0) {
    res.status(200).json({
      success: true,
      cart: { ...userCart, cartItems: [] }
    });
  } else {
    res.status(200).json({
      success: true,
      cart: cart[0]
    })
  }
})

// update cart => /api/v1/cart
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const cartItems = req.body.cartItems;
  let cart = await Cart.findOne({ user: req.user.id })
  let items = await CartItem.find({ cart: cart._id });
  items.forEach(item => item.remove());
  cartItems.forEach(item => CartItem.create({ cart: cart._id, productItem: item.productItem, quantity: item.quantity }));
  cart = { ...JSON.parse(JSON.stringify(cart)), cartItems };
  res.status(200).json({
    success: true,
    cart
  })
})
