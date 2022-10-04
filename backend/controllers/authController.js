const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/saasfgfaf',
      url: 'https://res.cloudinary.com/dubcozyd5/image/upload/v1664509239/products/hi2b2apeedvuse6dohvp.jpg'
    }
  });

  sendToken(user, 201, res)
})