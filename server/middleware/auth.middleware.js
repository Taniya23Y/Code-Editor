const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("./asyncHandler");
const redis = require("../config/redis");
const Auth = require("../models/auth.model");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken)
    return next(new ErrorHandler("Authentication required", 401));

  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const exists = await redis.get(`access:${decoded.id}`);
  if (!exists)
    return next(new ErrorHandler("Token expired. Please login again.", 401));

  const user = await Auth.findById(decoded.id).select("-password");
  if (!user) return next(new ErrorHandler("User not found", 404));
  if (!user.isActive)
    return next(new ErrorHandler("User account disabled", 403));

  req.user = user;
  next();
});

exports.autoRefreshAuth = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies?.accessToken;
  let refreshToken = req.cookies?.refreshToken;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
      const exists = await redis.get(`access:${decoded.id}`);
      if (exists) {
        req.user = await Auth.findById(decoded.id).select("-password");
        return next();
      }
    } catch {}
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
      const exists = await redis.get(`refresh:${decoded.id}`);
      if (!exists) throw new Error("Refresh token invalid");

      const user = await Auth.findById(decoded.id).select("-password");
      if (!user) throw new Error("User not found");

      const newAccessToken =
        require("../utils/tokenService").generateAccessToken(user);
      await redis.set(`access:${user._id}`, newAccessToken, "EX", 15 * 60);

      res.cookie(
        "accessToken",
        newAccessToken,
        require("../utils/cookieOptions").accessCookieOptions
      );
      req.user = user;
      return next();
    } catch {
      return next(
        new ErrorHandler("Session expired. Please login again.", 401)
      );
    }
  }

  return next(new ErrorHandler("Authentication required", 401));
});
