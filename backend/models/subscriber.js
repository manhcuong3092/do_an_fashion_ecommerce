const mongoose = require('mongoose');
const validator = require('validator');


const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Hãy nhập email'],
    unique: true,
    validate: [validator.isEmail, 'Hãy nhập email hợp lệ']
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
