const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Hãy nhập email'],
    validate: [validator.isEmail, 'Hãy nhập email hợp lệ']
  },
  name: {
    type: String,
    required: [true, 'Hãy nhập tên.'],
    trim: true,
    maxLength: [100, 'Tên không quá 100 ký tự']
  },
  content: {
    type: String,
    require: [true, 'Hãy nhập nội dung cần liên hệ'],
  },
  status: {
    type: String,
    default: "Chưa phản hồi"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Contact', contactSchema);
