const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    // create a testing account from ethereal
    const testAccount = await nodemailer.createTestAccount();

    // create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail
    const info = await transporter.sendMail({
      from: '"FocusZoo Support" <no-reply@focuszoo.com>', // sender
      to,
      subject,
      text,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return { success: true, preview: nodemailer.getTestMessageUrl(info) };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err.message };
  }
}

module.exports = sendEmail;
