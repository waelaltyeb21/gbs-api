const nodemailer = require("nodemailer");
const validator = require("validator");

const transporter = nodemailer.createTransport({
  service: "gmail", // or another SMTP service
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password", // use app password if 2FA is on
  },
});

const sendMail = async (to, text) => {
  // Check if the email is valid
  if (!validator.isEmail(to)) {
    throw new Error("Invalid email");
  }
  // Email Options
  const mailOptions = {
    from: "your-email@gmail.com",
    to,
    subject: "Reset Password",
    text,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

module.exports = { sendMail };
