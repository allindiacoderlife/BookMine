const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicates
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Security best practice
    },
    fullName: {
      type: String,
      trim: true,
    },
    universityId: {
      type: Number,
      required: true,
    },
    universityCard: {
      type: String, // Expecting a URL (e.g., ImageKit link)
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
); // adds createdAt, updatedAt

module.exports = mongoose.model("User", userSchema);
