const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  total: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Cart', cartSchema);
