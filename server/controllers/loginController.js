const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/User");
const Student = require("../models/Student");
const md5 = require("md5");

module.exports = function (req, res) {
  Student.findOne({
    attributes: { exclude: ["password"] },
    where: {
      sid: req.body.email,
      password: md5(req.body.password),
    },
  })
    .then((data) => {
      if (data !== null) {
        jwt.sign(
          { data },
          process.env.KEY,
          { expiresIn: "12h" },
          (err, token) => {
            res.status(200).json({
              result: true,
              message: "Login successfull!",
              token,
              data,
            });
          }
        );
      } else {
        console.log("No user found");
        res.status(200).json({
          result: true,
          message: "No user found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Something went wrong while logging in",
        error: err,
      });
    });
};