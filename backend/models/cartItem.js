const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productItem: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductItem',
    require: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cart',
    require: true
  }
})


module.exports = mongoose.model('CartItem', cartItemSchema);