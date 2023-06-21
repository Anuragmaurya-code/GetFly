const Sequelize = require("sequelize");
const studentModel = require("../models/Student");
const Student = require("../models/Student");
const md5 = require("md5");
const { MD5 } = require("crypto-js");

// function createStudent() {

module.exports = function createStudent(req, res) {
  // console.log(req.body.sid.toUpperCase());
  let b = req.body;
  pass = md5(b.password);
  Student.create({
    sid: b.sid.toUpperCase(),
    password: pass,
    name: b.name,
    contact_number: b.contact_number,
    class: b.class.toUpperCase(),
  })
    .then(() => {
      console.log("Student added!");
      res.status(200).json({
        result: true,
        message: "Registeration Successfull!",
      });
    })
    .catch((error) => {
      console.log("Error while registeration student");
      res.status(500).json({
        result: false,
        message: "Something went wrong while registeration student data",
        error: error,
      });
    });
};
