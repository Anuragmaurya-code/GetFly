const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function issues(req, res) {
  issueBooks
    .findAll({
      where: {
        isReturned: 0,
      },
    })
    .then((data) => {
      console.log(data.length);
      if (data.length < 1) {
        console.log("No data to show!");
        res.status(200).json({
          message: "No data to display!",
        });
      } else {
        console.log("Successfully sent issued Books data!");
        res.status(200).json(data);
      }

      // res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong",
        err: err,
      });
    });
};
