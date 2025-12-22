const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken(user, sid) {
    return jwt.sign(
      { id: user._id, role: "user", sid },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  },

  generateRefreshToken(user, sid) {
    return jwt.sign(
      { id: user._id, role: "user", sid },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
  },

  // verify token
  verifyUserAccess(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  },

  verifyUserRefresh(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  },
};
