const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('./product');

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên màu.'],
    trim: true,
    unique: true,
    maxLength: [100, 'Tên màu không quá 100 ký tự']
  },
  description: {
    type: String
  },
  hexCode: {
    type: String,
    required: [true, 'Hãy nhập mã màu.'],
    maxLength: [7, 'Mã màu không quá 100 ký tự']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

colorSchema.statics.findAll = async function () {
  return await this.find();
}

colorSchema.pre('remove', async function (next) {
  const products = await Product.find({ colors: this._id });
  if (products.length !== 0) {
    return next(new ErrorHandler('Không thể xóa màu khi đang có sản phẩm tham chiếu đến.', 400))
  }
});

module.exports = mongoose.model('Color', colorSchema);