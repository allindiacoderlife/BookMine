const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BORROW_STATUS_ENUM = ["BORROWED", "RETURNED", "OVERDUE"];

const BorrowSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  userId: { type: String, ref: "User", required: true },
  bookId: { type: String, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now, required: true },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  status: {
    type: String,
    enum: BORROW_STATUS_ENUM,
    default: "BORROWED",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Borrow", BorrowSchema);
