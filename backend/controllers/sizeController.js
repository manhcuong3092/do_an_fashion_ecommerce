const Size = require('../models/size');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createSize = catchAsyncError(async (req, res, next) => {
  const size = await Size.create(req.body);
  res.status(201).json({
    success: true,
    size
  });
})

exports.getAllSizes = catchAsyncError(async (req, res, next) => {
  const sizes = await Size.findAll();
  res.status(200).json({
    success: true,
    sizes
  });
})

exports.getSize = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const size = await Size.findById(id);
  if (!size) {
    return next(new ErrorHandler(`Không tìm thấy size: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    size
  });
})

exports.updateSize = catchAsyncError(async (req, res, next) => {
  const newSize = {
    name: req.body.name,
    description: req.body.description
  }
  const size = await Size.findByIdAndUpdate(req.params.id, newSize, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!size) {
    return next(new ErrorHandler(`Không tìm thấy size: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    size
  });
})

exports.deleteSize = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const size = await Size.findById(id);
  if (!size) {
    return next(new ErrorHandler(`Không tìm thấy size: ${req.params.id}`, 404));
  }
  await size.remove();
  res.status(200).json({
    success: true,
  });
}) 