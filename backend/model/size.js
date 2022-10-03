const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên kích cỡ.'],
    trim: true,
    maxLength: [100, 'Tên kích cỡ không quá 100 ký tự']
  },
  description: {
    type: String
  },
})

module.exports = mongoose.model('Size', sizeSchema);