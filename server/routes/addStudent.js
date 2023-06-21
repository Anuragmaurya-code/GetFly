const express = require("express");
const addStudentController = require("../controllers/addStudentController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", addStudentController);

module.exports = router;
