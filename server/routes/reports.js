const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const reportController = require("../controllers/reportController");
const router = express.Router();

router.post("/", verifyToken, reportController);


router.all("/dailyTransaction", verifyToken, (req, res) => {
  res.send("Daily book transaction report");
});

router.all("/dailyReissued ", verifyToken, (req, res) => {
  res.send("Daily book reissued report");
});

router.all("/lostBook", verifyToken, (req, res) => {
  res.send("Lost book reportLost Book report");
});

router.all("/dueDate", verifyToken, (req, res) => {
  res.send("Due dateted books report");
});

router.all("/circulatedBook", verifyToken, (req, res) => {
  res.send("Due dateted books report");
});

module.exports = router;
