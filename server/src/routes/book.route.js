const express = require("express");
const router = express.Router();
const {
  uploadBook,
  getBook,
  uploadMany,
  getBookById,
} = require("../controllers/book.controller");

router.post("/upload", uploadBook);
router.post("/upload-many", uploadMany);
router.get("/", getBook);
router.get("/:bookId", getBookById);

module.exports = router;
