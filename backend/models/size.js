const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const ProductItem = require('./productItem');

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

sizeSchema.statics.findAll = async function () {
  return await this.find();
}

sizeSchema.pre('remove', async function (next) {
  const products = await ProductItem.find({ size: this._id });
  if (products.length !== 0) {
    return next(new ErrorHandler('Không thể xóa kích cỡ khi đang có sản phẩm tham chiếu đến.', 400))
  }
});

module.exports = mongoose.model('Size', sizeSchema);