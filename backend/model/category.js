const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên danh mục.'],
    trim: true,
    maxLength: [100, 'Tên danh mục không quá 100 ký tự']
  },
  description: {
    type: String
  },
})

module.exports = mongoose.model('Category', categorySchema);