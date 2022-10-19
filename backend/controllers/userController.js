const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// Admin route

//Get all user => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
})

// Get user details => api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`Không tìm thấy user có id: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user
  })
})

//Create a user => /api/v1/admin/user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  let avatar = null;
  if (req.body.avatar) {
    console.log(req.body.avatar);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    });
    avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  const { name, email, password, city, address, phoneNo, role } = req.body;
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    phoneNo,
    city,
    address,
    avatar,
    role
  });

  res.status(201).json({
    success: true,
    user
  })
});


// Update user details => api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    city: req.body.city,
    address: req.body.address,
    role: req.body.role
  }
  // Update avatar
  if (req.body.avatar !== '') {
    const user = await User.findById(req.params.id);
    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  if (!user) {
    return next(new ErrorHandler(`Không tìm thấy user có id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user
  })
})

// Delete user => api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`Không tìm thấy user có id: ${req.params.id}`, 404));
  }
  
  await user.remove();
  res.status(200).json({
    success: true
  })
})