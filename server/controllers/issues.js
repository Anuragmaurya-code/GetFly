const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function issues(req, res) {
  let b = req.body;
  issueBooks
    .findAll({
      where: {
        isReturned: 0,
        sid: b.sid,
      },
    })
    .then((data) => {
      console.log(data.length);
      if (data.length < 1) {
        console.log("No data to show!");
        res.status(200).json({
          result: true,
          message: "No data to display!",
        });
      } else {
        console.log("Successfully displayed issued Books data!");
        res.status(200).json({
          result: true,
          message: "Successfully displayed issued Books data!",
          data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        error: "Something went wrong",
        err: err,
      });
    });
};
