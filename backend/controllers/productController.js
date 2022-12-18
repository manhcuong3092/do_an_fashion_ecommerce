const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const clouldinary = require('cloudinary');
const Review = require('../models/review');
const ProductSize = require('../models/productSize');
const ProductColor = require('../models/productColor');
const ProductItem = require('../models/productItem');
const ProductImage = require('../models/productImage');

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

  req.body.sizes.forEach(size =>
    ProductSize.create({ product: product._id, size: size })
  );

  req.body.colors.forEach(color =>
    ProductColor.create({ product: product._id, color: color })
  );

  req.body.stock.forEach(stock => {
    ProductItem.create({ product: product._id, color: stock.color, size: stock.size, stock: stock.quantity })
  })

  imagesLink.forEach(image =>
    ProductImage.create({ product: product._id, public_id: image.public_id, url: image.url })
  );

  res.status(201).json({
    success: true,
    product
  })
});

// get : /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category');

  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }
  const productSizes = await ProductSize.find({ product: req.params.id }).populate('size');
  const sizes = productSizes.map(item => item.size);

  const productColors = await ProductColor.find({ product: req.params.id }).populate('color');
  const colors = productColors.map(item => item.color);

  const images = await ProductImage.find({ product: req.params.id });

  const productItems = await ProductItem.find({ product: req.params.id }).populate('size').populate('color');

  res.status(200).json({
    success: true,
    product,
    sizes,
    colors,
    images,
    productItems
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
  const resPerPage = 6;
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
    let productImages = await ProductImage.find({ product: req.params.id });
    console.log(productImages);
    for (let i = 0; i < productImages.length; i++) {
      const result = await clouldinary.v2.uploader.destroy(productImages[i].public_id);
      productImages[i].remove()
    }

    for (let i = 0; i < images.length; i++) {
      try {
        const result = await clouldinary.v2.uploader.upload(images[i], {
          folder: 'products'
        });
        ProductImage.create({
          public_id: result.public_id,
          url: result.secure_url,
          product: req.params.id
        });
      } catch (error) {
        return next(new ErrorHandler('Tải ảnh có kích thước nhỏ hơn 1MB', 404));
      }
    }
  }

  const productSizes = await ProductSize.find({ product: req.params.id });
  productSizes.forEach(size => {
    size.remove();
  })
  req.body.sizes.forEach(size =>
    ProductSize.create({ product: product._id, size: size })
  );

  const productColors = await ProductColor.find({ product: req.params.id });
  productColors.forEach(color => {
    color.remove();
  })
  req.body.colors.forEach(color =>
    ProductColor.create({ product: product._id, color: color })
  );

  const productItems = await ProductItem.find({ product: req.params.id });
  productItems.forEach(item => {
    if (!req.body.sizes.includes(item.size.toString())) {
      item.remove()
    } else if (!req.body.colors.includes(item.color.toString())) {
      item.remove()
    }
  });

  req.body.stock = req.body.stock.map(item => {
    return JSON.parse(item)
  });

  console.log(req.body.stock);

  req.body.stock.forEach(async item => {
    const productItem = await ProductItem.findOneAndUpdate(
      {
        product: req.params.id,
        color: item.color,
        size: item.size,
      }, {
      stock: item.stock
    });
    if (!productItem) {
      ProductItem.create({
        product: req.params.id,
        color: item.color,
        size: item.size,
        stock: item.stock
      })
    }
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