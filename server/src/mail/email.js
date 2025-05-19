const { transporter, sender } = require("./email.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./email.templete.js");
require("dotenv").config();

const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to BookMine",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Welcome email sent:", info.response);
    }
  });
};

const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
};

const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Password reset success email sent:", info.response);
    }
  });
};

const sendReminderEmail = async (email, name) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Password Reset Successful",
    html: `<h3>Hello ${name},</h3><p>This is your reminder from BookMine after 3 days. Keep exploring your library! 📚</p>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Password reset success email sent:", info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendReminderEmail,
};
