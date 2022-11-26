const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
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

  const { name, email, password, city, address, phoneNo } = req.body;
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    phoneNo,
    city,
    address,
    avatar
  });

  sendToken(user, 201, res);
});

//Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Hãy nhập đầy đủ email và mật khẩu', 400))
  }

  //Find user in db
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Email hoặc mật khẩu không hợp lệ', 401));
  }

  //Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Email hoặc mật khẩu không hợp lệ', 401));
  }

  sendToken(user, 200, res);
});

//Logout User => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', 'null', {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out'
  });
});


// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(`Không tìm thấy người dùng của email ${req.body.email}`, 404));
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Đường link thay đổi mật khẩu của bạn ở dưới đây: \n\n${resetUrl}\n\n
    Nếu không phải yêu cầu đổi mật khẩu, bỏ qua nó`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Email khôi phục mật khẩu',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email đã gửi đến ${user.email}`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password =>  => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash url token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorHandler('Token thay đổi mật khẩu không hợp lệ hoặc đã quá hạn', 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Nhập lại mật khẩu không khớp', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});


//Get current logged in user details => api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

//Update / change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Mật khẩu hiện tại không hợp lệ', 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Nhập lại mật khẩu không khớp', 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
})

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    city: req.body.city,
    address: req.body.address
  }

  // Update avatar
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
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

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  })
});

exports.googleLogin = catchAsyncErrors(async (req, res, next) => {
  const { credentialResponse } = req.body;
  client.verifyIdToken({ idToken: credentialResponse.credential, audience: process.env.GOOGLE_CLIENT_ID })
    .then(async (response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        const user = await User.findOne({ email });
        if (user) {
          sendToken(user, 201, res);
        } else {
          const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: email,
            phoneNo: '0000000000',
          });
          sendToken(newUser, 201, res);
        }
      }
    });

  console.log();
})