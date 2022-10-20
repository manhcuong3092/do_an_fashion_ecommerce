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
  avatar: {
    type: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    require: [true, 'Hãy nhập ảnh đại diện.'],
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

blogSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.title)}-${Date.now()}`
})

blogSchema.pre('findByIdAndUpdate', async function (next) {
  if (!this.isModified('title')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.title)}-${Date.now()}`
})

module.exports = mongoose.model('Blog', blogSchema);
