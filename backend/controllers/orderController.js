const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { SUCCEEDED, CANCELLED, DELIVERING, PENDING } = require('../constants/orderStatus');

//create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentType,
    paymentStatus,
    user
  } = req.body;

  console.log(req.body);

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentType,
    paymentStatus,
    paidAt: Date.now(),
    user
  })

  res.status(200).json({
    success: true,
    order
  });
});


// get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('orderItems.size', 'name')
    .populate('orderItems.color', 'name');
  if (!order) {
    return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  }

  res.status(200).json({
    success: true,
    order
  })
})


// get logged user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders
  })
})

// get all orders => /api/v1/admin/orders - admin
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach(order => {
    totalAmount += order.totalPrice
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})

// update/process orders => /api/v1/admin/order/:id - admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if (order.orderStatus === SUCCEEDED) {
    return next(new ErrorHandler('Bạn đã giao hàng rồi', 400));
  }

  if (order.orderStatus === CANCELLED) {
    return next(new ErrorHandler('Đơn hàng đã bị hủy rồi', 400));
  }

  if (req.body.status === DELIVERING) {
    order.orderItems.forEach(async item => {
      await updateStock(item.product, item.size, item.color, item.quantity);
    });
  
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
  } else if (req.body.status === CANCELLED) {
    order.orderStatus = req.body.status;
  } else if (req.body.status === SUCCEEDED) {
    if (order.orderStatus === PENDING) {
      return next(new ErrorHandler('Đơn hàng chưa được giao', 400));
    }
    order.orderStatus = req.body.status;
  }
  
  await order.save()
  
  res.status(200).json({
    success: true,
    order
  })
})


async function updateStock(id, size, color, quantity) {
  const product = await Product.findById(id);
  product.stock.forEach((item, index) => {
    if (item.size.toString() === size.toString() && item.color.toString() === color.toString()) {
      product.stock[index].quantity = product.stock[index].quantity - quantity;
    }
  })
  await product.save({ validateBeforeSave: false })
}


// delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true
  })
})