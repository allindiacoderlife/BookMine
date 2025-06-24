const express = require("express");
const router = express.Router();
const { uploadBook , getBook } = require("../controllers/book.controller");

router.post("/upload", uploadBook);
router.get("/", getBook);

module.exports = router;