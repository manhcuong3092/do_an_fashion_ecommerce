const mongoose = require('mongoose');

const productColorSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: true
  },
  color: {
    type: mongoose.Schema.ObjectId,
    ref: 'Color',
    require: true
  },
})


module.exports = mongoose.model('ProductColor', productColorSchema);