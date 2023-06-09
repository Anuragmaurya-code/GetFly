const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const addBookController = require("../controllers/addBookController");
const router = express.Router();

router.post("/", verifyToken, addBookController);

module.exports = router;
