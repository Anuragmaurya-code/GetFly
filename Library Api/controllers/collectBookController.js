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
      console.log("Data updated successfully!");
      console.log(data);
      res.status(200).json({
        message: "Data updated successfully!",
      });
    })
    .catch((err) => {
      console.log("Something went wrong while updating data!");
      res.status(500).send(err);
    });
  //   console.log(req.body.id);
  //   res.send(req.body.id);
};
