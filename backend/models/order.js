const mongoose = require('mongoose');
const { SUCCEEDED, DELIVERING } = require('../constants/orderStatus');
const ErrorHandler = require('../utils/errorHandler');
const OrderItem = require('./orderItem');

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


orderSchema.pre('remove', async function (next) {
  if (this.orderStatus === SUCCEEDED) {
    return next(new ErrorHandler('Không thể xóa đơn hàng đã giao', 400));
  }
  if (this.orderStatus === DELIVERING) {
    return next(new ErrorHandler('Không thể xóa đơn hàng đang giao', 400));
  }
  const orderItem = await OrderItem.find({ order: this._id });
  orderItem.forEach(item => item.remove());
});

module.exports = mongoose.model('Order', orderSchema);
