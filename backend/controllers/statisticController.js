const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require('../models/product')
const Order = require('../models/order')
const User = require('../models/user')

exports.getStatistic = catchAsyncErrors(async (req, res, next) => {
  let users, products, orders;
  const promise1 = Order.find().populate('user', 'name email')
    .populate({
      path: 'orderItems.product',
      model: 'Product',
      populate: {
        path: 'category',
        model: 'Category'
      }
    })
    .populate('orderItems.size', 'name')
    .populate('orderItems.color', 'name');
  const promise2 = Product.find().populate('category')
    .populate('sizes')
    .populate('colors')
    .populate('stock.size')
    .populate('stock.color');
  const promise3 = User.find();
  await Promise.all([promise1, promise2, promise3]).then((value) => {
    orders = value[0];
    products = value[1];
    users = value[2];
  });
  
  res.status(200).json({
    orders,
    products,
    users
  })
});