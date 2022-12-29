const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { SUCCEEDED, CANCELLED, DELIVERING, PENDING } = require('../constants/orderStatus');
const ProductImage = require('../models/productImage');
const ProductItem = require('../models/productItem');
const { default: mongoose } = require('mongoose');

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

  let order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentType,
    paymentStatus,
    paidAt: paymentStatus ? Date.now() : null,
    user
  });

  await Promise.all(orderItems.map(item =>
    OrderItem.create({
      order: order._id,
      productItem: item.productItem,
      quantity: item.quantity,
      price: item.price
    })
  )).then(() => {
    console.log('done');
  });
  console.log('get order');

  const orderDetails = await OrderItem.find({ order: order._id })
    .populate({ path: "productItem", populate: [{ path: 'product' }, { path: 'color' }, { path: 'size' }] });


  order = { ...JSON.parse(JSON.stringify(order)), orderItems: orderDetails }
  console.log(order);

  res.status(200).json({
    success: true,
    order
  });
});


// get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  // let order = await Order.findById(req.params.id)
  //   .populate('user', 'name email')

  // if (!order) {
  //   return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  // }

  // let orderItems = await OrderItem.find({ order: order._id })
  //   .populate({ path: "productItem", populate: [{ path: 'product' }, { path: 'color' }, { path: 'size' }] });

  // orderItems = JSON.parse(JSON.stringify(orderItems));

  // await Promise.all(orderItems.map(item => ProductImage.find({ product: item.productItem.product._id })))
  //   .then((values) => {
  //     values.forEach((item, index) => {
  //       orderItems[index].productItem.product = { ...orderItems[index].productItem.product, images: item }
  //     })
  //   });

  // order = { ...JSON.parse(JSON.stringify(order)), orderItems };

  const order = await Order.findOrderById(req.params.id)

  console.log(order);

  if (order.length === 0) {
    return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  }

  res.status(200).json({
    success: true,
    order: order[0]
  })
})


// get logged user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findByUser(req.user.id);
  res.status(200).json({
    success: true,
    orders
  })
})

// get all orders => /api/v1/admin/orders - admin
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ '_id': -1 });

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
    const orderItems = await OrderItem.find({ order: req.params.id }).populate('productItem');
    for (let item of orderItems) {
      if (item.productItem.stock - item.quantity < 0) {
        return next(new ErrorHandler('Không đủ hàng trong kho', 400));
      }
    };

    orderItems.forEach(async item => {
      await updateStock(item.productItem, item.quantity);
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

  } else if (req.body.status === CANCELLED) {
    const orderItems = await OrderItem.find({ order: req.params.id }).populate('productItem');
    order.orderStatus = req.body.status;
    orderItems.forEach(async item => {
      await updateStock(item.productItem, -item.quantity);
    });
  } else if (req.body.status === SUCCEEDED) {
    if (order.orderStatus === PENDING) {
      return next(new ErrorHandler('Đơn hàng chưa được giao', 400));
    }
    order.orderStatus = req.body.status;
    order.paymentStatus = true;
    order.paidAt = Date.now();
  }

  await order.save()

  res.status(200).json({
    success: true,
    order
  })
})

async function updateStock(productItem, quantity) {
  const product = await Product.findById(productItem.product._id);
  const item = await ProductItem.findById(productItem._id);
  product.sold += quantity;
  item.stock = item.stock - quantity
  await product.save({ validateBeforeSave: false })
  await item.save({ validateBeforeSave: false })
}


// delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
  }

  await order.remove();
  OrderItem.deleteMany({ order: req.params.id })

  res.status(200).json({
    success: true
  })
})