const Subscriber = require('../models/subscriber');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createSubscriber = catchAsyncError(async (req, res, next) => {
  const subscriber = await Subscriber.create(req.body);
  res.status(201).json({
    success: true,
    subscriber
  });
}) 

exports.getAllSubscribers = catchAsyncError(async (req, res, next) => {
  const subscribers = await Subscriber.find();
  res.status(200).json({
    success: true,
    subscribers
  });
}) 

exports.deleteSubscriber = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const subscriber = await Subscriber.findById(id);
  if (!subscriber) {
    return next(new ErrorHandler(`Không tìm thấy subscriber: ${req.params.id}`, 404));
  }
  await subscriber.remove();
  res.status(200).json({
    success: true,
  });
}) 