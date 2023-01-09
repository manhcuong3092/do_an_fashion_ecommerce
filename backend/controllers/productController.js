const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const clouldinary = require('cloudinary');
const Review = require('../models/review');
const ProductItem = require('../models/productItem');
const ProductImage = require('../models/productImage');
const { default: mongoose } = require('mongoose');
const OrderItem = require('../models/orderItem');

// get : /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = []
  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  let imagesLink = [];

  await Promise.all(images.map(image =>
    clouldinary.v2.uploader.upload(image, {
      folder: 'products'
    })
  )).then(values => {
    imagesLink = values.map(item => {
      return {
        public_id: item.public_id,
        url: item.secure_url
      }
    })
  }).catch(error => {
    console.log(error);
    return next(new ErrorHandler('Tải ảnh có kích thước nhỏ hơn 1MB', 404));
  });

  req.body.images = imagesLink;
  req.body.createdBy = req.user.id;

  req.body.stock = req.body.stock.map(item => {
    return JSON.parse(item)
  });
  if (!req.body.salePrice) {
    req.body.salePrice = 0;
  }
  const product = await Product.create(req.body);

  req.body.stock.forEach(stock => {
    ProductItem.create({ product: product._id, color: stock.color, size: stock.size, sku: stock.sku, stock: stock.quantity })
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

  const images = await ProductImage.find({ product: req.params.id });

  let productItems = await ProductItem.findByProduct(req.params.id);
  productItems = JSON.parse(JSON.stringify(productItems));

  const sizes = [], colors = [];
  productItems.forEach(item => {
    if (!sizes.some(size => size._id === item.size._id)) {
      sizes.push(item.size);
    }
    if (!colors.some(color => color._id === item.color._id)) {
      colors.push(item.color);
    }
  });

  productItems = productItems.sort((a, b) => {
    if (a.size._id > b.size._id) {
      return 1;
    }
    return -1;
  })

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
  const product = await Product.findOneProduct(req.params.slug)
  // .populate('category').getAll();

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
  let result = await Product.findAll(req);
  result = result[0];
  const products = result.paginatedResults;
  const filteredProductsCount = products.length;
  const productsCount = filteredProductsCount === 0 ? 0 : result.totalCount[0].count;

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
  const filterAggregate = [{
    $match: {
      name: {
        $regex: '',
        $options: 'i'
      }
    }
  },
  {
    $match: { active: { $eq: true } }
  }
  ];

  filterAggregate.push({ $limit: 4 });
  filterAggregate.push({ $lookup: { from: 'productimages', localField: '_id', foreignField: 'product', as: 'images' } });

  const products = await Product.aggregate(filterAggregate);

  res.status(200).json({
    success: true,
    products,
  })
});

// get all products : /api/v1/admin/products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  // const productName = req.query.productName || '';
  // let products = await Product.find({ name: { $regex: productName, $options: 'i' } })
  //   .populate('category');

  req.query.keyword = req.query.productName;
  let result = await Product.findAll(req, false);
  result = result[0];
  const products = result.paginatedResults;

  // products = JSON.parse(JSON.stringify(products));

  // await Promise.all(products.map(item => ProductItem.find({ product: item._id })))
  //   .then((values) => {
  //     values.forEach((item, index) => {
  //       products[index] = { ...products[index], productItems: item }
  //     })
  //   });

  // await Promise.all(products.map(item => ProductImage.find({ product: item._id })))
  //   .then((values) => {
  //     values.forEach((item, index) => {
  //       products[index] = { ...products[index], images: item }
  //     })
  //   });

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

  const itemWillDeleted = [];
  let remove = true;

  const productItems = await ProductItem.find({ product: req.params.id });
  productItems.forEach(item => {
    if (!req.body.sizes.includes(item.size.toString())) {
      itemWillDeleted.push(item);
    } else if (!req.body.colors.includes(item.color.toString())) {
      itemWillDeleted.push(item);
    }
  });

  await Promise.all(itemWillDeleted.map(item =>
    OrderItem.aggregate([
      { $match: { 'productItem': new mongoose.Types.ObjectId(item._id) } }
    ])
  )).then(values => {
    values.forEach(item => {
      if (item.length > 0) {
        remove = false
      }
    });
  });
  if (remove) {
    itemWillDeleted.forEach(item => {
      item.remove()
    });
  } else {
    return next(new ErrorHandler('Không thể cập nhật sản phẩm do phân loại đang có trong đơn hàng', 400));
  }

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
      stock: item.stock,
      sku: item.sku
    });
    if (!productItem) {
      ProductItem.create({
        product: req.params.id,
        color: item.color,
        size: item.size,
        stock: item.stock,
        sku: item.sku
      })
    }
  });

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


  await product.remove()
  //delete images
  const images = await ProductImage.find({ product: req.params.id });
  for (let i = 0; i < images.length; i++) {
    const result = await clouldinary.v2.uploader.destroy(images[i].public_id);
  }

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
  const reviews = await Review.find({ product: productId })
    .populate({ path: "user", populate: [{ path: 'avatar' }] });
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
  // const reviews = await Review.find({ product: req.query.productId }).populate('user');
  const reviews = await Review.find({ product: req.query.productId })
    .populate({ path: "user", populate: [{ path: 'avatar' }] });
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