const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function issueBook(req, res) {
  b = req.body;
  issueBooks
    .create({
      quantity_id: b.quantity_id,
      issue_date: b.issue_date,
      due_date: b.due_date,
      sid: b.sid,
      isReturned: false,
      isReissued: false,
    })
    .then((data) => {
      console.log("Data added successfully!");
      console.log(data);
      res.status(200).json({
        message: "Data added successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // res.send("Inside Issue Book");
};
