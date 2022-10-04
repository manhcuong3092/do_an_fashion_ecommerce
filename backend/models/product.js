const mongoose = require('mongoose')

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
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    require: true
  },
  sizes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Size',
      require: true
    }
  ],
  colors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Color',
      require: true
    }
  ],
  stock: [
    {
      quantity: {
        type: Number,
        required: [true, 'Hãy nhập số lượng sản phẩm'],
        maxLength: [6, 'Số lượng sản phẩm trong kho không quá 6 ký tự'],
        default: 0,
      },
      size:
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Size',
        require: true
      },
      color:
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Color',
        require: true
      }
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }
  const slug = require('slug');
  this.slug = `${slug(this.name)}-${Date.now()}`
})

module.exports = mongoose.model('Product', productSchema);