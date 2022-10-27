//Check if user authenticated or not

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
  const jwtToken = req.headers.authorization;
  if(!jwtToken) {
    return next(new ErrorHandler('Phải đăng nhập mới có quyền truy cập tài nguyên.', 401))
  } 
  let auth = jwtToken.split(' ');
  if (auth[0] != 'Bearer') {
    return next(new ErrorHandler('Phải đăng nhập mới có quyền truy cập tài nguyên.', 401));
  }
  
  const token = auth[1];
  if (!token) return next(new ErrorHandler('Header xác thực bị thiếu.', 401));
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next()
  } catch (error) {
    return next(new ErrorHandler('Token không hợp lệ hoặc hết hạn.', 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Tài khoản (${req.user.role}) không được cho phép truy nhập tài nguyên`, 403))
    }
    next();
  }
}