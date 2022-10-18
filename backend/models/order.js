const mongoose = require('mongoose');

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
  orderItems: [
    {
      size: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Size'
      },
      color: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Color'
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
    }
  ],
  onlinePaymentInfo: {
    id: {
      type: String
    },
    status: {
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

module.exports = mongoose.model('Order', orderSchema);
