const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  totalCopies: { type: Number, required: true },
  coverUrl: { type: String },
  coverColor: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  summary: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
