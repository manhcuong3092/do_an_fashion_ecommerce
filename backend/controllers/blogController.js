const Blog = require('../models/blog');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createBlog = catchAsyncError(async (req, res, next) => {
  req.body.author = req.user._id;
  const blog = await Blog.create(req.body);
  res.status(201).json({
    success: true,
    blog
  });
}) 

exports.getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    success: true,
    blogs
  });
}) 

exports.getBlog = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler(`Không tìm thấy blog: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    blog
  });
}) 

exports.updateBlog = catchAsyncError(async (req, res, next) => {
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
  await blog.remove();
  res.status(200).json({
    success: true,
  });
}) 