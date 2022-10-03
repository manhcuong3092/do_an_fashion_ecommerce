const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    required: [true, 'Hãy nhập tiêu đề bài viết.'],
    trim: true,
    maxLength: [100, 'Tên danh mục không quá 100 ký tự']
  },
  content: {
    type: String,
    require: [true, 'Hãy nhập nội dung bài viết'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Blog', userSchema);
