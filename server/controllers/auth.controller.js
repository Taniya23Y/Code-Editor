require("dotenv").config();
const Auth = require("../models/auth.model");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const { validateRegistration, validateForgot } = require("../utils/validators");
const emailService = require("../utils/welcomeService");
const tokenService = require("../utils/tokenService");
const otpService = require("../utils/otpService");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../utils/cookieOptions");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const bcrypt = require("bcryptjs");

const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 60 * 60;
const PWRESET_TTL = 15 * 60;

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { firstName, lastName, username, developerType, email, password } =
      req.body;

    const exists = await Auth.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      return next(new ErrorHandler("Email or username already exists", 409));
    }

    const user = await Auth.create({
      firstName,
      lastName,
      username,
      developerType,
      email,
      password,
      isVerified: false,
    });

    const ok = await otpService.checkOtpRequests(email);
    if (!ok)
      return next(new ErrorHandler("Too many OTP requests. Try later.", 429));

    await otpService.sendOTP(email, firstName, "register");

    res.status(201).json({
      success: true,
      message: "Account created. OTP sent to email for verification.",
      userId: user._id,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new ErrorHandler("Email and OTP required", 400));
    }

    const valid = await otpService.verifyOTP(email, otp);
    if (!valid) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    const user = await Auth.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Email and password required", 400));

    const user = await Auth.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid credentials", 401));
    if (!user.isVerified)
      return next(new ErrorHandler("Please verify your email", 403));

    const match = await user.comparePassword(password);
    if (!match) return next(new ErrorHandler("Invalid credentials", 401));

    const accessToken = require("../utils/tokenService").generateAccessToken(
      user
    );
    const refreshToken = require("../utils/tokenService").generateRefreshToken(
      user
    );

    await redis.set(`access:${user._id}`, accessToken, "EX", 15 * 60);
    await redis.set(
      `refresh:${user._id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );

    emailService.sendWelcomeEmail(email, user.firstName).catch(() => {});

    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return next(new ErrorHandler("Refresh token required", 401));
    }

    let decoded;
    try {
      decoded = tokenService.verifyUserRefresh(refreshToken);
    } catch {
      return next(new ErrorHandler("Invalid or expired refresh token", 401));
    }

    const userId = decoded.id;

    const storedRefresh = await redis.get(`refresh:${userId}`);
    if (!storedRefresh || storedRefresh !== refreshToken) {
      return next(new ErrorHandler("Refresh token revoked", 401));
    }

    const user = await Auth.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const newAccessToken = tokenService.generateAccessToken(user);

    await redis.set(`access:${userId}`, newAccessToken, "EX", ACCESS_TTL);

    res
      .cookie("accessToken", newAccessToken, accessCookieOptions)
      .status(200)
      .json({
        success: true,
        accessToken: newAccessToken,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          profilePic: user.profilePic,
        },
      });
  } catch (err) {
    next(new ErrorHandler(err.message || "Invalid refresh token", 401));
  }
});

exports.updateAccessToken = asyncHandler(async (req, res, next) => {
  return exports.refreshToken(req, res, next);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const error = validateForgot(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { email } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await otpService.sendOTP(email, user.firstName, "forgot");

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.verifyForgotPassword = asyncHandler(async (req, res, next) => {
  try {
    let { email, otp } = req.body;

    if (!email || !otp)
      return next(new ErrorHandler("Missing email or OTP", 400));

    email = email.trim().toLowerCase();

    const valid = await otpService.verifyOTP(email, otp);
    if (!valid) return next(new ErrorHandler("Invalid or expired OTP", 400));

    await redis.set(`pwreset:${email}`, "allowed", "EX", PWRESET_TTL);

    return res.status(200).json({
      success: true,
      message: "OTP verified. You may reset your password now.",
      allowResetForSeconds: PWRESET_TTL,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  try {
    let { email, newPassword } = req.body;
    if (!email || !newPassword)
      return next(new ErrorHandler("Missing email or newPassword", 400));
    email = email.trim().toLowerCase();

    const allowed = await redis.get(`pwreset:${email}`);
    if (!allowed)
      return next(new ErrorHandler("OTP not verified or expired.", 401));

    const user = await Auth.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword)
      return next(new ErrorHandler("New password cannot be same as old", 400));

    const hashed = await bcrypt.hash(newPassword, 10);
    await Auth.findOneAndUpdate({ email }, { password: hashed }, { new: true });

    await redis.del(`pwreset:${email}`);
    await redis.del(`access:${user._id}`);
    await redis.del(`refresh:${user._id}`);

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
});

exports.logout = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        await redis.del(`refresh:${payload.id}`);
      } catch {}
    }

    res
      .clearCookie("accessToken", accessCookieOptions)
      .clearCookie("refreshToken", refreshCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    next(new ErrorHandler(err.message, 500));
  }
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Not authenticated", 401));
  }

  const user = await Auth.findById(req.user._id).select("-password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
