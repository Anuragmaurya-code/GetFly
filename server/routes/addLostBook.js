const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const addLostBookController = require("../controllers/addLostBookController");
const router = express.Router();

router.post("/", verifyToken, addLostBookController);

module.exports = router;
