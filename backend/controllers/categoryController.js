const Category = require('../models/category');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category
  });
}) 

exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categories
  });
}) 

exports.getCategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ErrorHandler(`Không tìm thấy danh mục: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    category
  });
}) 

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.name
  }
  const category = await Category.findByIdAndUpdate(req.params.id, newCategory, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!category) {
    return next(new ErrorHandler(`Không tìm thấy danh mục: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    category
  });
}) 

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ErrorHandler(`Không tìm thấy danh mục: ${req.params.id}`, 404));
  }
  await category.remove();
  res.status(200).json({
    success: true,
  });
}) 