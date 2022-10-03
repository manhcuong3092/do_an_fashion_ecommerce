const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên màu.'],
    trim: true,
    maxLength: [100, 'Tên màu không quá 100 ký tự']
  },
  description: {
    type: String
  },
  hexCode: {
    type: String,
    required: [true, 'Hãy nhập mã màu.'],
    maxLength: [7, 'Mã màu không quá 100 ký tự']
  }
})

module.exports = mongoose.model('Color', colorSchema);