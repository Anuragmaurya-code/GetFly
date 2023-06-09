const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const issueBooks = require("../models/issueBook");
const issueBookController = require("../controllers/issueBookController");
const router = express.Router();

router.post("/", verifyToken, issueBookController);

module.exports = router;
