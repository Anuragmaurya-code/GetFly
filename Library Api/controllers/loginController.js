const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/User");

module.exports = function (req, res) {
  userModel
    .findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
    .then((data) => {
      if (data !== null) {
        jwt.sign(
          { data },
          process.env.KEY,
          { expiresIn: "4h" },
          (err, token) => {
            res.status(200).json({
              token,
            });
          }
        );
      } else {
        console.log("No data found");
        res.status(200).json({
          message: "No data found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};
