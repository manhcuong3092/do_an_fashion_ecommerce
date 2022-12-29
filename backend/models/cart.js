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

cartSchema.statics.findByUser = async function (userId) {
  return await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: { from: 'cartitems', localField: '_id', foreignField: 'cart', as: 'cartItems' }
    },
    { $unwind: "$cartItems" },
    { $lookup: { from: 'productitems', localField: 'cartItems.productItem', foreignField: '_id', as: 'cartItems.productItem' } },
    { $unwind: "$cartItems.productItem" },
    { $lookup: { from: 'products', localField: 'cartItems.productItem.product', foreignField: '_id', as: 'cartItems.productItem.product' } },
    { $unwind: "$cartItems.productItem.product" },
    { $lookup: { from: 'sizes', localField: 'cartItems.productItem.size', foreignField: '_id', as: 'cartItems.productItem.size' } },
    { $unwind: "$cartItems.productItem.size" },
    { $lookup: { from: 'colors', localField: 'cartItems.productItem.color', foreignField: '_id', as: 'cartItems.productItem.color' } },
    { $unwind: "$cartItems.productItem.color" },
    { $lookup: { from: 'productimages', localField: 'cartItems.productItem.product._id', foreignField: 'product', as: 'cartItems.productItem.product.images' } },
    {
      $group: {
        _id: "$_id",
        cartItems: { $push: "$cartItems" },
        user: { $first: "$user" },
      }
    }
  ]);
}

module.exports = mongoose.model('Cart', cartSchema);
