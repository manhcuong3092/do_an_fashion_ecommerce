const mongoose = require('mongoose');


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
    require: false,
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
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

module.exports = mongoose.model('User', userSchema);
