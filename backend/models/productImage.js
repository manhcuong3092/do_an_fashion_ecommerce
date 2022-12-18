const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: true
  }
})


module.exports = mongoose.model('ProductImage', productImageSchema);