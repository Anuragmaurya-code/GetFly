const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const dashoardController = require("../controllers/dashboardController");

router.post("/", verifyToken, dashoardController);
router.post("/dashboard", (req, res) => {
    
})

module.exports = router;
