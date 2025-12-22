const sendEmail = require("../utils/sendMail");

module.exports = {
  async sendWelcomeEmail(email, name) {
    const subject = "Welcome Back to Code.Compiler!";
    const template = "welcome-mail.ejs";

    const data = {
      user: { name },
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
      logoUrl:
        "https://github.com/Taniya23Y/Code-Editor/blob/main/client/public/favicon-32x32.png",
      heroImageUrl:
        "https://github.com/Taniya23Y/Code-Editor/blob/main/client/src/assets/images/codeCompiler-heroImage.png",
    };

    await sendEmail({ email, subject, template, data });
  },
};
