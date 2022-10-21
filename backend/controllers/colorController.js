const Color = require('../models/color');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createColor = catchAsyncError(async (req, res, next) => {
  const color = await Color.create(req.body);
  res.status(201).json({
    success: true,
    color
  });
}) 

exports.getAllColors = catchAsyncError(async (req, res, next) => {
  const colors = await Color.find();
  res.status(200).json({
    success: true,
    colors
  });
}) 

exports.getColor = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const color = await Color.findById(id);
  if (!color) {
    return next(new ErrorHandler(`Không tìm thấy màu: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    color
  });
}) 

exports.updateColor = catchAsyncError(async (req, res, next) => {
  const newColor = {
    name: req.body.name,
    description: req.body.description,
    hexCode: req.body.hexCode
  }
  const color = await Color.findByIdAndUpdate(req.params.id, newColor, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  if (!color) {
    return next(new ErrorHandler(`Không tìm thấy màu: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    color
  });
}) 

exports.deleteColor = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const color = await Color.findById(id);
  if (!color) {
    return next(new ErrorHandler(`Không tìm thấy màu: ${req.params.id}`, 404));
  }
  await color.remove();
  res.status(200).json({
    success: true,
  });
}) 