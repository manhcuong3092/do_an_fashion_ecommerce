const Contact = require('../models/contact');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


exports.createContact = catchAsyncError(async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    contact
  });
}) 

exports.getAllContacts = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json({
    success: true,
    contacts
  });
}) 

exports.getContact = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(new ErrorHandler(`Không tìm thấy contact: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    contact
  });
}) 

exports.deleteContact = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(new ErrorHandler(`Không tìm thấy contact: ${req.params.id}`, 404));
  }
  await contact.remove();
  res.status(200).json({
    success: true,
  });
}) 