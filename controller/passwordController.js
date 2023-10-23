// controllers/passwordController.js

const User = require("../models/userModel"); // Import your model
const nodemailer = require("nodemailer");

async function handlePasswordResetRequest(req, res) {
  const { email } = req.body;

  try {
    // Generate a random password
    const newPassword = userModel.generateRandomPassword(12);

    // Update the user's password in the database
    await User.updateUserPasswordByEmail(email, newPassword);

    // Send the new password via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
      
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Your new password: ${newPassword}`,
    };
      console.log(newPassword);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Email could not be sent." });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Password reset email sent successfully." });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while resetting the password." });
  }
}

module.exports = {
  handlePasswordResetRequest,
};
