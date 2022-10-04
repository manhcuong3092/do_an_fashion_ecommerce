const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Hãy nhập email'],
    unique: true,
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Contact', contactSchema);
