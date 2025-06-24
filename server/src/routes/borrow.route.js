const express = require("express");
const {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  returnBook,
} = require("../controllers/borrow.controller");

const router = express.Router();

router.post("/", createBorrow);              // POST /api/borrows
router.get("/", getAllBorrows);              // GET /api/borrows
router.get("/:borrowId", getBorrowById);     // GET /api/borrows/:borrowId
router.put("/:borrowId/return", returnBook); // PUT /api/borrows/:borrowId/return

module.exports = router;
