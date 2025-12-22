module.exports = {
  validateRegistration(data) {
    if (!data.firstName || data.firstName.length < 2) {
      return "First name is too short";
    }
    if (!data.lastName || data.lastName.length < 2) {
      return "Last name is too short";
    }
    if (!data.email) return "Email is required";
    if (!data.password || data.password.length < 6)
      return "Password min length 6";
    return null;
  },

  validateForgot(data) {
    if (!data.email) return "Email required";
    return null;
  },
};
