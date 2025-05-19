const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL, // Your email address (use environment variables for security)
    pass: process.env.PASSWORD, // Your email password or app-specific password
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring transporter:", error);
  } else {
    console.log("Email transporter is ready to send messages.");
  }
});

const sender = {
  name: "BookMine(Chirag Saxena)",
  email: process.env.EMAIL,
};
module.exports = { transporter, sender };