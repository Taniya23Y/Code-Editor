const express = require("express");
const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  refreshToken,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
  logout,
  getProfile,
  getPublicProfile,
} = require("../controllers/auth.controller");

const {
  isAuthenticated,
  autoRefreshAuth,
} = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

router.post("/refresh", refreshToken);

router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password", verifyForgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", autoRefreshAuth, isAuthenticated, getProfile);
router.get("/public-profile/:username", getPublicProfile);
router.post("/logout", isAuthenticated, logout);

router.get(
  "/admin/dashboard",
  autoRefreshAuth,
  isAuthenticated,
  isAdmin,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;
