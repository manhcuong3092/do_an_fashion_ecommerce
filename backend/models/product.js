const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const Order = require('./order');
const Cart = require('./cart');
const ProductItem = require('./productItem');
const OrderItem = require('./orderItem');
const ProductImage = require('./productImage');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy nhập tên sản phẩm'],
    trim: true,
    maxLength: [100, 'Tên sản phẩm không quá 100 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Hãy nhập giá sản phẩm'],
    maxLength: [12, 'Giá sản phẩm không quá 12 ký tự'],
    default: 0.0,
  },
  salePrice: {
    type: Number,
    maxLength: [12, 'Giá sản phẩm không quá 12 ký tự'],
    default: 0.0,
  },
  isSale: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Nhập mô tả cho sản phẩm'],
  },
  detailDescription: {
    type: String,
  },
  slug: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0.0
  },
  gender: {
    type: String,
    default: 'Tất cả'
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    require: true
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

productSchema.statics.findOneProduct = async function (slug) {
  const product = await this.findOne({ slug }).populate('category');
  if (!product) {
    return null
  }
  const images = await ProductImage.find({ product: product._id });

  let productResult = JSON.parse(JSON.stringify(product));
  productResult = { ...productResult, images };

  let productItems = await ProductItem.find({ product: product._id }).populate('size').populate('color');
  productItems = productItems.map(item => {
    return { ...JSON.parse(JSON.stringify(item)), product: productResult }
  })

  productItems = productItems.sort((a, b) => {
    if (a.size._id > b.size._id) {
      return 1;
    }
    return -1;
  })

  const sizes = [], colors = [];
  productItems.forEach(item => {
    if (!sizes.some(size => size._id === item.size._id)) {
      sizes.push(item.size);
    }
    if (!colors.some(color => color._id === item.color._id)) {
      colors.push(item.color);
    }
  });

  productResult = { ...productResult, sizes, colors, productItems };
  return productResult;
}

productSchema.statics.findAll = async function (req) {
  const resPerPage = 6;

  const filterAggregate = [
    {
      $match: { active: { $eq: true } }
    }
  ];
  if (req.query.keyword) {
    filterAggregate.push({
      $match: {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    })
  }

  if (req.query.category) {
    filterAggregate.push({
      $match: { category: new mongoose.Types.ObjectId(req.query.category) }
    })
  }

  if (req.query.price) {
    if (req.query.price.gte) {
      filterAggregate.push({
        $match: { price: { $gte: Number.parseInt(req.query.price.gte) } }
      })
    }
    if (req.query.price.lte) {
      filterAggregate.push({
        $match: { price: { $lte: Number.parseInt(req.query.price.lte) } }
      })
    }
  }

  if (req.query.gender) {
    filterAggregate.push({
      $match: {
        gender: {
          $regex: req.query.gender,
          $options: 'i'
        }
      }
    })
  }

  if (req.query.gender) {
    filterAggregate.push({
      $match: {
        gender: {
          $regex: req.query.gender,
          $options: 'i'
        }
      }
    })
  }

  if (req.query.size && req.query.color) {
    filterAggregate.push({ $lookup: { from: 'productitems', localField: '_id', foreignField: 'product', as: 'productSizes' } },);
    filterAggregate.push({ $unwind: "$productSizes" },);
    filterAggregate.push({
      $match: { 'productSizes.size': new mongoose.Types.ObjectId(req.query.size) }
    })

    filterAggregate.push({ $lookup: { from: 'productitems', localField: '_id', foreignField: 'product', as: 'productColors' } },);
    filterAggregate.push({ $unwind: "$productColors" },);
    filterAggregate.push({
      $match: { 'productColors.color': new mongoose.Types.ObjectId(req.query.color) }
    });

    filterAggregate.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        price: { $first: "$price" },
        salePrice: { $first: "$salePrice" },
        isSale: { $first: "$isSale" },
        ratings: { $first: "$ratings" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        active: { $first: "$active" },
        slug: { $first: "$slug" },
        images: { $first: "$slug" },
        productSizes: { $first: "$productSizes" },
        productColors: { $first: "$productColors" }
      }
    })

    filterAggregate.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        price: { $first: "$price" },
        salePrice: { $first: "$salePrice" },
        isSale: { $first: "$isSale" },
        ratings: { $first: "$ratings" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        active: { $first: "$active" },
        slug: { $first: "$slug" },
        images: { $first: "$slug" },
        productColors: { $first: "$productColors" },
        productSizes: { $first: "$productSizes" }
      }
    })

  } else if (req.query.color) {
    filterAggregate.push({ $lookup: { from: 'productitems', localField: '_id', foreignField: 'product', as: 'productColors' } },);
    filterAggregate.push({ $unwind: "$productColors" },);
    filterAggregate.push({
      $match: { 'productColors.color': new mongoose.Types.ObjectId(req.query.color) }
    });
    filterAggregate.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        price: { $first: "$price" },
        salePrice: { $first: "$salePrice" },
        isSale: { $first: "$isSale" },
        ratings: { $first: "$ratings" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        active: { $first: "$active" },
        slug: { $first: "$slug" },
        images: { $first: "$slug" },
        productColors: { $first: "$productColors" }
      }
    })
  } else if (req.query.size) {
    filterAggregate.push({ $lookup: { from: 'productitems', localField: '_id', foreignField: 'product', as: 'productSizes' } },);
    filterAggregate.push({ $unwind: "$productSizes" },);
    filterAggregate.push({
      $match: { 'productSizes.size': new mongoose.Types.ObjectId(req.query.size) }
    })

    filterAggregate.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        price: { $first: "$price" },
        salePrice: { $first: "$salePrice" },
        isSale: { $first: "$isSale" },
        ratings: { $first: "$ratings" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        active: { $first: "$active" },
        slug: { $first: "$slug" },
        images: { $first: "$slug" },
        productSizes: { $first: "$productSizes" }
      }
    })
  }

  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);

  filterAggregate.push({ $lookup: { from: 'productimages', localField: '_id', foreignField: 'product', as: 'images' } });

  filterAggregate.push({
    $facet: {
      paginatedResults: [{ $skip: skip }, { $limit: resPerPage }],
      totalCount: [
        {
          $count: 'count'
        }
      ]
    }
  });

  // filterAggregate.push({ $skip: skip });
  // filterAggregate.push({ $limit: resPerPage });

  return await this.aggregate(filterAggregate);
}

productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.name)}-${Date.now()}`
});

productSchema.pre('remove', async function (next) {
  const productItems = await ProductItem.find({ product: this._id });
  let remove = true;

  await Promise.all(productItems.map(item =>
    OrderItem.aggregate([
      { $match: { 'productItem': new mongoose.Types.ObjectId(item._id) } }
    ])
  )).then(values => {
    values.forEach(item => {
      if (item.length > 0) {
        remove = false
      }
    });
  })
  if (remove) {
    productItems.forEach(item => {
      item.remove()
    });
  } else {
    return next(new ErrorHandler('Không thể xóa sản phẩm đang nằm trong đơn hàng', 400));
  }
  // const orders = await Order.find({ 'orderItems.productItem.product': this._id });
  // if (orders.length !== 0) {
  //   return next(new ErrorHandler('Không thể xóa sản phẩm khi có đơn hàng tham chiếu đến.', 400))
  // }
  // const carts = await Cart.find({ 'cartItems.product': this._id });
  // carts.forEach(cart => {
  //   const cartItems = cart.cartItems.filter(item => item.product.toString() !== this._id.toString());
  //   cart.cartItems = cartItems;
  //   cart.save();
  // })
});

module.exports = mongoose.model('Product', productSchema);