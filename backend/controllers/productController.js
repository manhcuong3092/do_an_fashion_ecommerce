const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const clouldinary = require('cloudinary');
const Review = require('../models/review');
const review = require('../models/review');

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
  if (!req.body.salePrice) {
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
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('sizes')
    .populate('colors')
    .populate('stock.size')
    .populate('stock.color')
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
  const resPerPage = 9;
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

// get latest products : /api/v1/products
exports.getLatestProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ active: true }).sort('-_id').limit(4);

  res.status(200).json({
    success: true,
    products,
  })
});

// get all products : /api/v1/admin/products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const productName = req.query.productName || '';
  const products = await Product.find({ name: { $regex: productName, $options: 'i' } })
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

  if (!req.body.salePrice) {
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
    product: productId,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  let result = null;

  const isReviewed = await Review.findOne({ product: productId, user: req.user._id });
  if (!isReviewed) {
    result = await Review.create(review);
  } else {
    result = await Review.findByIdAndUpdate(isReviewed._id, review);
  }
  const reviews = await Review.find({ product: productId }).populate('user');
  const product = await Product.findById(productId);

  product.ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
  product.numOfReviews = reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    reviews
  })
})

//Get product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const reviews = await Review.find({ product: req.query.productId }).populate('user');
  res.status(200).json({
    success: true,
    reviews
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