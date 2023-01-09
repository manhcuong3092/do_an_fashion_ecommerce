const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('./product');
const Order = require('./order');
const Blog = require('./blog');
const Review = require('./review');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Hãy nhập tên.'],
    maxLength: [100, 'Tên không quá 100 ký tự']
  },
  email: {
    type: String,
    require: [true, 'Hãy nhập email'],
    unique: true,
    validate: [validator.isEmail, 'Hãy nhập email hợp lệ']
  },
  phoneNo: {
    type: String,
    require: [true, 'Hãy nhập số điện thoại'],
    maxLength: [11, 'Số điện thoại không quá 11 ký tự'],
    match: [/\d{10,11}/, 'Số điện thoại không hợp lệ']
  },
  password: {
    type: String,
    require: [true, 'Hãy nhập mật khẩu'],
    minLength: [6, 'Mật khẩu phải lớn hơn 6 ký tự'],
    select: false
  },
  city: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
  avatar: {
    type: mongoose.Schema.ObjectId,
    ref: 'Image',
    require: true
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

//Encrypt password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.pre('remove', async function (next) {
  const products = await Product.find({ createdBy: this._id });
  if (products.length !== 0) {
    return next(new ErrorHandler('Không thể xóa người dùng tạo sản phẩm tham chiếu đến.', 400))
  }
  const blogs = await Blog.find({ author: this._id });
  if (blogs.length !== 0) {
    return next(new ErrorHandler('Không thể xóa người dùng có bài viết tham chiếu đến.', 400))
  }
  const reviews = await Review.deleteMany({ user: this._id });
  const orders = await Order.find({ user: this._id });
  if (orders.length !== 0) {
    orders.forEach(order => {
      order.user = null;
      order.save();
    });
  }
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = function () {
  // Generate token 
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and reset password
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
}

module.exports = mongoose.model('User', userSchema);
