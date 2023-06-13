const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const dashoardController = require("../controllers/dashboardController");

router.get("/", verifyToken, dashoardController);

module.exports = router;
