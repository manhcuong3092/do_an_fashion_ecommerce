const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  cartItems: [
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
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
    }
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
