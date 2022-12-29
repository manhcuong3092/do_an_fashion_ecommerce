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
  sku: {
    type: String,
    require: true,
    default: ''
  },
  stock: {
    type: Number,
    required: [true, 'Hãy nhập số lượng sản phẩm'],
    maxLength: [6, 'Số lượng sản phẩm trong kho không quá 6 ký tự'],
    default: 0,
  },
})


productItemSchema.statics.findByProduct = async function (productId) {
  return await this.find({ product: productId }).populate('size').populate('color');
}

module.exports = mongoose.model('ProductItem', productItemSchema);