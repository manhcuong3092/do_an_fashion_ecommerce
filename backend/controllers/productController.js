const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const clouldinary = require('cloudinary');

// get : /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = []
  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    try {
      const result = await clouldinary.v2.uploader.upload(images[i], {
        folder: 'products'
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    } catch (error) {
      return next(new ErrorHandler('Tải ảnh có kích thước nhỏ hơn 1MB', 404));
    }
  }

  req.body.images = imagesLink;
  req.body.createdBy = req.user.id;

  req.body.stock = req.body.stock.map(item => {
    return JSON.parse(item)
  });
  if(!req.body.salePrice) {
    req.body.salePrice = 0;
  }
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
});

// get : /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)      
    .populate('category')
    .populate('sizes')
    .populate('colors')
    .populate('stock.size')
    .populate('stock.color');
  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }

  res.status(200).json({
    success: true,
    product
  })
});

// get : /api/v1/product/:slug
exports.getProductBySlug = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({slug: req.params.slug})      
    .populate('category')
    .populate('sizes')
    .populate('colors')
    .populate('stock.size')
    .populate('stock.color')
    .populate('reviews.user');
  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }

  res.status(200).json({
    success: true,
    product
  })
});

// get products : /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();
  req.query.active = true;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
  let products = await apiFeatures.query;
  let filteredProductsCount = products.length
  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resPerPage,
    filteredProductsCount
  })
});

// get all products : /api/v1/admin/products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find()
    .populate('category')
    .populate('sizes')
    .populate('colors')
    .populate('stock.size')
    .populate('stock.color');

  res.status(200).json({
    success: true,
    products,
  })
});

// update : /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }

  let images = []
  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  if (images.length !== 0) {
    //delete images
    for (let i = 0; i < product.images.length; i++) {
      const result = await clouldinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      try {
        const result = await clouldinary.v2.uploader.upload(images[i], {
          folder: 'products'
        });
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url
        });
        req.body.images = imagesLink;
      } catch (error) {
        return next(new ErrorHandler('Tải ảnh có kích thước nhỏ hơn 1MB', 404));
      }
    } 
  } else {
    req.body.images = product.images;
  }

  req.body.stock = req.body.stock.map(item => {
    return JSON.parse(item)
  });

  if(!req.body.salePrice) {
    req.body.salePrice = 0;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true
  });

  res.status(200).json({
    success: true,
    product
  })
});


// delete : /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }
  
  //delete images
  for (let i = 0; i < product.images.length; i++) {
    const result = await clouldinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: 'Đã xóa sản phẩm'
  })
});


//Create new review => /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating
      }
    })
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  const updatedProduct = await Product.findById(productId).populate('reviews.user');
  res.status(200).json({
    success: true,
    reviews: updatedProduct.reviews
  })
})

//Get product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId).populate('reviews.user');
  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

//Delete product Reviews => /api/v1/admin/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true
  })
})