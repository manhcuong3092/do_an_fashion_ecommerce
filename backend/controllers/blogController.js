const Blog = require('../models/blog');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const Image = require('../models/image');


exports.createBlog = catchAsyncError(async (req, res, next) => {
  let avatar = null;
  if (req.body.avatar) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
      });
      avatar = await Image.create({
        public_id: result.public_id,
        url: result.secure_url
      })
      req.body.avatar = avatar._id;
    } catch (error) {
      return next(new ErrorHandler(`Tải ảnh lên có kích thước nhỏ hơn 1 MB.`, 400));
    }
  } else {
    return next(new ErrorHandler(`Hãy nhập ảnh đại diện của bài viết.`, 400));
  }
  req.body.author = req.user._id;
  const blog = await Blog.create(req.body);
  res.status(201).json({
    success: true,
    blog
  });
})

exports.getBlogs = catchAsyncError(async (req, res, next) => {
  const blogsCount = await Blog.countDocuments();
  let resPerPage = 4;
  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);
  if (req.query.limit) {
    resPerPage = Number(req.query.limit);
  }

  const blogs = await Blog.find().sort('-_id').limit(resPerPage).skip(skip).populate('author').populate('avatar');

  res.status(200).json({
    success: true,
    blogs,
    resPerPage,
    filteredBlogsCount: blogsCount
  });
});


exports.getLatestBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find().sort('-_id').limit(3).populate('author').populate('avatar');
  res.status(200).json({
    success: true,
    blogs,
  });
});

exports.getBlogBySlug = catchAsyncError(async (req, res, next) => {
  const slug = req.params.slug;
  const blog = await Blog.findOne({ slug }).populate('author').populate('avatar');
  if (!blog) {
    return next(new ErrorHandler(`Không tìm thấy blog`, 404));
  }
  res.status(200).json({
    success: true,
    blog
  });
})


exports.getBlog = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate('author').populate('avatar');
  if (!blog) {
    return next(new ErrorHandler(`Không tìm thấy blog: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    blog
  });
})

exports.updateBlog = catchAsyncError(async (req, res, next) => {
  // Update avatar
  if (req.body.avatar !== '') {
    const blog = await Blog.findById(req.params.id);
    const image_id = blog.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
    });
    req.body.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  } else {
    delete req.body.avatar;
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!blog) {
    return next(new ErrorHandler(`Không tìm thấy blog: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    blog
  });
})

exports.deleteBlog = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler(`Không tìm thấy blog: ${req.params.id}`, 404));
  }

  const image_id = blog.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await blog.remove();
  res.status(200).json({
    success: true,
  });
})

exports.getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find().populate('author').populate('avatar');
  res.status(200).json({
    success: true,
    blogs,
  });
})
