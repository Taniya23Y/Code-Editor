const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("./asyncHandler");

exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Authentication required", 401));
  }

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied: Admins only", 403));
  }

  next();
});
