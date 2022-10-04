const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

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

  sendToken(user, 201, res)
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

  sendToken(user, 200, res)
})