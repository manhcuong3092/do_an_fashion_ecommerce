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
    cart
  });
});


// get logged user cart => /api/v1/cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
  let cart = await Cart.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $lookup: { from: 'cartitems', localField: '_id', foreignField: 'cart', as: 'cartItems' }
    },
    { $unwind: "$cartItems" },
    { $lookup: { from: 'productitems', localField: 'cartItems.productItem', foreignField: '_id', as: 'cartItems.productItem' } },
    { $unwind: "$cartItems.productItem" },
    { $lookup: { from: 'products', localField: 'cartItems.productItem.product', foreignField: '_id', as: 'cartItems.productItem.product' } },
    { $unwind: "$cartItems.productItem.product" },
    { $lookup: { from: 'sizes', localField: 'cartItems.productItem.size', foreignField: '_id', as: 'cartItems.productItem.size' } },
    { $unwind: "$cartItems.productItem.size" },
    { $lookup: { from: 'colors', localField: 'cartItems.productItem.color', foreignField: '_id', as: 'cartItems.productItem.color' } },
    { $unwind: "$cartItems.productItem.color" },
    { $lookup: { from: 'productimages', localField: 'cartItems.productItem.product._id', foreignField: 'product', as: 'cartItems.productItem.product.images' } },
    {
      $group: {
        _id: "$_id",
        cartItems: { $push: "$cartItems" },
        user: { $first: "$user" },
      }
    }
  ]);
  if (cart.length === 0) {
    return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  }
  res.status(200).json({
    success: true,
    cart: cart[0]
  })
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
