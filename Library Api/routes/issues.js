const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const issues = require("../controllers/issues");
const router = express.Router();

router.get("/", verifyToken, issues);

module.exports = router;
