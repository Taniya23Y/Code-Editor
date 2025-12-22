const redis = require("../config/redis");
const sendEmail = require("../utils/sendMail");

module.exports = {
  async sendOTP(email, name, type = "register") {
    let subject, template, data;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (type === "register" || type === "forgot") {
      await redis.set(`otp:${email}`, otp, "EX", 300);
    }

    switch (type) {
      case "register":
        subject = "Verify Your Code.Compiler Account";
        template = "activate-mail.ejs";
        data = {
          user: { name },
          activationCode: otp,
          logoUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/public/favicon-32x32.png",
          heroImageUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/src/assets/images/codeCompiler-heroImage.png",
        };
        break;

      case "forgot":
        subject = "Reset Your Code.Compiler Password";
        template = "forgot-password-mail.ejs";
        data = {
          user: { name },
          otp,

          resetUrl: `${process.env.FRONTEND_URL}/reset-password`,
          email,
          logoUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/public/favicon-32x32.png",
          heroImageUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/src/assets/images/codeCompiler-heroImage.png",
        };
        break;

      case "welcome":
        subject = "Welcome Back to Code.Compiler!";
        template = "welcome-mail.ejs";
        data = {
          user: { name },
          dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
          logoUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/public/favicon-32x32.png",
          heroImageUrl:
            "https://github.com/Taniya23Y/Code-Editor/blob/main/client/src/assets/images/codeCompiler-heroImage.png",
        };
        break;

      default:
        throw new Error("Invalid email type");
    }

    await sendEmail({ email, subject, template, data });

    return otp;
  },

  async sendWelcomeEmail(email, name) {
    return this.sendOTP(email, name, "welcome");
  },

  async verifyOTP(email, otp) {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp) return false;

    if (storedOtp !== otp.toString()) return false;

    await redis.del(`otp:${email}`);

    await redis.del(`otp-req:${email}`);

    return true;
  },

  async checkOtpRequests(email) {
    const key = `otp-req:${email}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > 5) {
      return false;
    }

    return true;
  },
};
