const Book = require("../models/book.model");

const uploadBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadMany = async (req, res) => {
  try {
    const books = req.body; // should be an array
    await Book.insertMany(books);
    res.status(201).json({ message: "Books inserted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOne({ _id: bookId });


    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadBook, getBook, uploadMany, getBookById };
