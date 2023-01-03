const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const ProductItem = require('./productItem');

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
  const products = await ProductItem.find({ color: this._id });
  console.log(products);
  console.log('aaa');
  if (products.length !== 0) {
    console.log('aaa');
    return next(new ErrorHandler('Không thể xóa màu khi đang có sản phẩm tham chiếu đến.', 400))
  }
});

module.exports = mongoose.model('Color', colorSchema);