const cron = require("node-cron");
const User = require("../models/user.model");
const { sendReminderEmail } = require("../mail/email");

// Runs every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  const dayNum = 1/12;
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - dayNum);

  const users = await User.find({
    createdAt: {
      $gte: new Date(daysAgo.setHours(0, 0, 0)),
      $lte: new Date(daysAgo.setHours(23, 59, 59)),
    },
  });

  for (let user of users) {
    await sendReminderEmail(user.email, user.fullName || "User");
  }

  console.log(` ${dayNum}-day reminder emails sent.`);
});
