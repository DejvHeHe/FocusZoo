require("dotenv").config(); // <-- loads variables from .env
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // should be an App Password if using Gmail
      },
      tls: {
        rejectUnauthorized: false, // ⚠️ only for development/testing
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully to:", to);
    return { success: true };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err.message };
  }
}

module.exports = sendEmail;
