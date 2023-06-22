const express = require("express");
const Book = require("../models/Book");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/getBookId", verifyToken, (req, res) => {
  console.log("Book Id getting");
  Book.findAll({
    attributes: ["book_id"],
  }).then((data) => {
    console.log("Book data");
    data=data.map(obj => obj.book_id)
    res.status(200).json({
      result: true,
      message: "Book id sent successfully!",
      data: data,
    });
  });
});

module.exports = router;