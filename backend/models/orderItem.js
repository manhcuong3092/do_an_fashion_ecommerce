const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductItem',
    require: true
  },
  price: {
    type: Number,
    required: true,
    default: 0.0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    require: true
  }
})

orderItemSchema.statics.findByOrder = async function (orderId) {
  return await this.find({ order: orderId });
}

module.exports = mongoose.model('OrderItem', orderItemSchema);