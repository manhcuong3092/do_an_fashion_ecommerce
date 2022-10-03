const Size = require('../model/size');
const catchAsyncError = require('../middlewares/catchAsyncErrors');


exports.createSize = catchAsyncError(async (req, res, next) => {
  const size = await Size.create(req.body);
  res.status(201).json({
    success: true,
    size
  });
}) 

exports.getAllSize = catchAsyncError(async (req, res, next) => {
  const sizes = await Size.find();
  res.status(200).json({
    success: true,
    sizes
  });
}) 