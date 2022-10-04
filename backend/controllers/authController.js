const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    avatar: {
      public_id: 'avatars/saasfgfaf',
      url: 'https://res.cloudinary.com/dubcozyd5/image/upload/v1664509239/products/hi2b2apeedvuse6dohvp.jpg'
    }
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
    return next(new ErrorHandler(`Không tìm thấy user của email ${req.body.email}`, 404));
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