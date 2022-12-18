const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: true
  },
  size: {
    type: mongoose.Schema.ObjectId,
    ref: 'Size',
    require: true
  },
})


module.exports = mongoose.model('ProductSize', productSizeSchema);