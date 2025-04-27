const {
  ComparePassword,
  HashPassword,
  HashingPassword,
} = require("../../Services/HashData");
const SupervisorModel = require("../supervisors/SupervisorModel");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  console.log("Req", req.body);
  const { email, password } = req.body;
  try {
    const supervisor = await SupervisorModel.findOne({ email });
    if (!supervisor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check If The Password Is Correct
    const IsMatched = await ComparePassword(password, supervisor.password);

    if (!IsMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ email: supervisor.email }, process.env.JWT_SECRET);

    // Allow credentials to be sent with the request
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // Set the token as a cookie
    res
      .status(200)
      .cookie("token", token, {
        // httpOnly: false, // true On Deploy
        // secure: false, // true On Deploy
        maxAge: 15 * 60 * 1000, // 15 Minutes
      })
      .json({
        message: "Login successful",
        supervisor: { email: supervisor.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const Logout = async (req, res) => {
  try {
    return res.clearCookie("token").json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const supervisor = await SupervisorModel.findOne({ email });
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    const token = jwt.sign({ email: supervisor.email }, process.env.JWT_SECRET);
    // const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const emailSent = await sendMail(
      supervisor.email,
      "OTP Code"
      // resetLink
    );
    if (emailSent) {
      return res.status(200).json({ message: "Email sent" });
    } else {
      return res.status(500).json({ message: "Email not sent" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Login, Logout, ForgotPassword };
