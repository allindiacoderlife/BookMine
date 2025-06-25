const express = require("express");
const {
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUser);
router.delete("/:userId", deleteUser);
router.put("/:userId", updateUser);

module.exports = router;
