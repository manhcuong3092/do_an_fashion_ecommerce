const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require('../models/product')
const Order = require('../models/order')
const User = require('../models/user')

exports.getStatistic = catchAsyncErrors(async (req, res, next) => {
  let users, products, orders;
  const promise1 = Order.aggregate([
    {
      $lookup: { from: 'orderitems', localField: '_id', foreignField: 'order', as: 'orderItems' }
    },
    { $unwind: "$orderItems" },
    { $lookup: { from: 'productitems', localField: 'orderItems.productItem', foreignField: '_id', as: 'orderItems.productItem' } },
    { $unwind: "$orderItems.productItem" },
    { $lookup: { from: 'products', localField: 'orderItems.productItem.product', foreignField: '_id', as: 'orderItems.productItem.product' } },
    { $unwind: "$orderItems.productItem.product" },
    { $lookup: { from: 'categories', localField: 'orderItems.productItem.product.category', foreignField: '_id', as: 'orderItems.productItem.product.category' } },
    { $unwind: "$orderItems.productItem.product.category" },
    {
      $group: {
        _id: "$_id",
        orderItems: { $push: "$orderItems" },
        shippingInfo: { $first: "$shippingInfo" },
        user: { $first: "$user" },
        paymentType: { $first: "$paymentType" },
        paymentStatus: { $first: "$paymentStatus" },
        paidAt: { $first: "$paidAt" },
        itemsPrice: { $first: "$itemsPrice" },
        shippingPrice: { $first: "$shippingPrice" },
        totalPrice: { $first: "$totalPrice" },
        orderStatus: { $first: "$orderStatus" },
        createdAt: { $first: "$createdAt" },
        deliveredAt: { $first: "$deliveredAt" },
      }
    }
  ]);
  const promise2 = Product.find().populate('category');
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