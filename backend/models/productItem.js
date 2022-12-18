const mongoose = require('mongoose');

const productItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: true
  },
  size: {
    type: mongoose.Schema.ObjectId,
    ref: 'Size',
    require: true
  },
  color: {
    type: mongoose.Schema.ObjectId,
    ref: 'Color',
    require: true
  },
  stock: {
    type: Number,
    required: [true, 'Hãy nhập số lượng sản phẩm'],
    maxLength: [6, 'Số lượng sản phẩm trong kho không quá 6 ký tự'],
    default: 0,
  },
})


module.exports = mongoose.model('ProductItem', productItemSchema);