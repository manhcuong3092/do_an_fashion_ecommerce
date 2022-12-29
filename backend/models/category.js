const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('./product');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên danh mục.'],
    trim: true,
    unique: true,
    maxLength: [100, 'Tên danh mục không quá 100 ký tự']
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
  },
});

categorySchema.statics.findAll = async function () {
  return await this.find();
}

categorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  console.log(this.name);
  this.slug = `${slug(this.name)}`
});


categorySchema.pre('findByIdAndUpdate', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.name)}`
})

categorySchema.pre('remove', async function (next) {
  const products = await Product.find({ category: this._id });
  if (products.length !== 0) {
    return next(new ErrorHandler('Không thể xóa danh mục khi đang có sản phẩm tham chiếu đến.', 400))
  }
  // await Product.updateMany({ category: this._id }, { category: null });
});

module.exports = mongoose.model('Category', categorySchema);