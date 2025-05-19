const express = require("express");
const { uploadFile } = require("../imagekit/imagekit");
const router = express.Router();

router.get("/auth", uploadFile);

module.exports = router;