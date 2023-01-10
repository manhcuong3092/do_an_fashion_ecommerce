const mongoose = require('mongoose');
const { SUCCEEDED, DELIVERING, COD } = require('../constants/orderStatus');
const ErrorHandler = require('../utils/errorHandler');
const OrderItem = require('./orderItem');
const ProductImage = require('./productImage');

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  onlinePaymentInfo: {
    id: {
      type: String
    },
    status: {
      type: String
    },
    card_number: {
      type: String
    }
  },
  paymentType: {
    type: String
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Đang xử lý'
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

orderSchema.statics.findByUser = async function (userId) {
  return await this.find({ user: userId }).sort({ _id: -1 });
}

orderSchema.statics.findOrderById = async function (orderId) {
  return await this.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
    {
      $lookup: { from: 'orderitems', localField: '_id', foreignField: 'order', as: 'orderItems' }
    },
    { $unwind: "$orderItems" },
    { $lookup: { from: 'productitems', localField: 'orderItems.productItem', foreignField: '_id', as: 'orderItems.productItem' } },
    { $unwind: "$orderItems.productItem" },
    { $lookup: { from: 'products', localField: 'orderItems.productItem.product', foreignField: '_id', as: 'orderItems.productItem.product' } },
    { $unwind: "$orderItems.productItem.product" },
    { $lookup: { from: 'sizes', localField: 'orderItems.productItem.size', foreignField: '_id', as: 'orderItems.productItem.size' } },
    { $unwind: "$orderItems.productItem.size" },
    { $lookup: { from: 'colors', localField: 'orderItems.productItem.color', foreignField: '_id', as: 'orderItems.productItem.color' } },
    { $unwind: "$orderItems.productItem.color" },
    { $lookup: { from: 'productimages', localField: 'orderItems.productItem.product._id', foreignField: 'product', as: 'orderItems.productItem.product.images' } },
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
}

orderSchema.pre('remove', async function (next) {
  if (this.orderStatus === SUCCEEDED) {
    return next(new ErrorHandler('Không thể xóa đơn hàng đã giao', 400));
  }
  if (this.orderStatus === DELIVERING) {
    return next(new ErrorHandler('Không thể xóa đơn hàng đang giao', 400));
  }
  console.log(this.paymentStatus);
  if (this.paymentStatus === true) {
    return next(new ErrorHandler('Không thể xóa đơn hàng đã được thanh toán', 400));
  }
  const orderItem = await OrderItem.find({ order: this._id });
  orderItem.forEach(item => item.remove());
});

module.exports = mongoose.model('Order', orderSchema);
