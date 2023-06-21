const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function collectBook(req, res) {
  console.log(req.body.issued_id);
  issueBooks
    .update(
      {
        return_date: req.body.return_date,
        isReturned: true,
      },
      {
        where: {
          issued_id: parseInt(req.body.issued_id),
        },
      }
    )
    .then((data) => {
      console.log("Book collected successfully!");
      res.status(200).json({
        result: true,
        message: "Book collected successfully!",
      });
    })
    .catch((err) => {
      console.log("Something went wrong while updating data!");
      res.status(500).json({
        result: false,
        message: "Someting went wrong while collecting book",
        error: err,
      });
    });
};
