const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const clouldinary = require('cloudinary');
const Review = require('../models/review');
const ProductItem = require('../models/productItem');
const ProductImage = require('../models/productImage');
const { default: mongoose } = require('mongoose');

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

  let productItems = await ProductItem.find({ product: req.params.id }).populate('size').populate('color');
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
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')

  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
  }

  if (!product) {
    return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
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

  res.status(200).json({
    success: true,
    product: productResult
  })
});

// get products : /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
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

  let result = await Product.aggregate(filterAggregate);
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
  const productName = req.query.productName || '';
  let products = await Product.find({ name: { $regex: productName, $options: 'i' } })
    .populate('category');

  products = JSON.parse(JSON.stringify(products));

  await Promise.all(products.map(item => ProductItem.find({ product: item._id })))
    .then((values) => {
      values.forEach((item, index) => {
        products[index] = { ...products[index], productItems: item }
      })
    });

  await Promise.all(products.map(item => ProductImage.find({ product: item._id })))
    .then((values) => {
      values.forEach((item, index) => {
        products[index] = { ...products[index], images: item }
      })
    });

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
  const images = await ProductImage.find({ product: req.params.id });
  for (let i = 0; i < images.length; i++) {
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

  console.log(review);

  let result = null;

  const isReviewed = await Review.findOne({ product: productId, user: req.user._id });
  if (!isReviewed) {
    result = await Review.create(review);
  } else {
    result = await Review.findByIdAndUpdate(isReviewed._id, review);
  }
  const reviews = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
    { $unwind: "$user" },
    { $lookup: { from: 'images', localField: 'user.avatar', foreignField: '_id', as: 'user.avatar' } },
    { $unwind: "$user.avatar" },
  ]);
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
  const reviews = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(req.query.productId) } },
    { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
    { $unwind: "$user" },
    { $lookup: { from: 'images', localField: 'user.avatar', foreignField: '_id', as: 'user.avatar' } },
    { $unwind: "$user.avatar" },
  ]);
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