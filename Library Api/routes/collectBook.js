const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, (req, res) => {
  res.send("Collect book Post request");
});

module.exports = router;
