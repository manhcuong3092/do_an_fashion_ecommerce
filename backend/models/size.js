const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('./product');

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên kích cỡ.'],
    trim: true,
    unique: true,
    maxLength: [100, 'Tên kích cỡ không quá 100 ký tự']
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

sizeSchema.pre('remove', async function (next) {
  const products = await Product.find({ sizes: this._id });
  if (products.length !== 0) {
    return next(new ErrorHandler('Không thể xóa kích cỡ khi đang có sản phẩm tham chiếu đến.', 400))
  }
});

module.exports = mongoose.model('Size', sizeSchema);