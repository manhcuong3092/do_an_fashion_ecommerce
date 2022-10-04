const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const clouldinary = require('cloudinary');

// get : /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  
  // Todo: upload images
  console.log(req.body);

  req.body.stock = req.body.stock.map(item => {
    return JSON.parse(item)
  });
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

// get products : /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();
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

// update : /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
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

  await product.remove()

  res.status(200).json({
    success: true,
    message: 'Đã xóa sản phẩm'
  })
});