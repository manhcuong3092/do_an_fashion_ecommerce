//Check if user authenticated or not

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
  const {token} = req.cookies;
  console.log(req.cookies);

  if(!token) {
    return next(new ErrorHandler('Phải đăng nhập mới có quyền truy cập tài nguyên.', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next()
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Tài khoản (${req.user.role}) không được cho phép truy nhập tài nguyên`, 403))
    }
    next();
  }
}