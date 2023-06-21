const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function issueBook(req, res) {
  console.log(req.body);
  b = req.body;
  issueBooks
    .create({
      book_id: b.book_id,
      issue_date: b.issue_date,
      due_date: b.due_date,
      sid: b.sid,
      isReturned: false,
      isReissued: false,
    })
    .then((data) => {
      console.log("Book Issued successfully!");

      res.status(200).json({
        result: true,
        message: "Book issued successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Someting went wrong while issueing book",
        error: err,
      });
    });
};
