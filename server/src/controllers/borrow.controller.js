const Book = require("../models/book.model");
const Borrow = require("../models/borrow.model");

const createBorrow = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Step 1: Check if the book exists and has available copies
    const book = await Book.findById({_id: bookId});
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ error: "No available copies left" });
    }

    // Step 2: Prevent duplicate borrow
    const existing = await Borrow.findOne({
      userId,
      bookId,
      status: "BORROWED",
    });
    if (existing) {
      return res.status(400).json({ error: "You already borrowed this book." });
    }

    // Step 3: Create the borrow record
    const borrow = new Borrow({
      userId,
      bookId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: "BORROWED",
    });
    await borrow.save(); // ✅ Save it to MongoDB

    // Step 4: Decrease availableCopies by 1 (atomic)
    await Book.updateOne(
      { _id: bookId },
      { $inc: { availableCopies: -1 } }
    );

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (err) {
    console.error("Error creating borrow:", err.message);
    res.status(500).json({ error: err.message });
  }
};


const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find().populate("userId").populate("bookId");
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBorrowById = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId)
      .populate("userId")
      .populate("bookId");

    if (!borrow)
      return res.status(404).json({ error: "Borrow entry not found" });

    res.json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId);

    if (!borrow)
      return res.status(404).json({ error: "Borrow entry not found" });

    borrow.returnDate = new Date();
    borrow.status = "RETURNED";
    await borrow.save();

    res.json({ message: "Book returned successfully", borrow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBorrow, getAllBorrows, getBorrowById, returnBook };
