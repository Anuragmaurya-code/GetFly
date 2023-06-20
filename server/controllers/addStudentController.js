const Sequelize = require("sequelize");
const studentModel = require("../models/Student");
const Student = require("../models/Student");

// function createStudent() {

module.exports = function createStudent(req, res) {
  // console.log(req.body.sid.toUpperCase());
  Student.create({
    sid: req.body.sid.toUpperCase(),
    name: req.body.name,
    contact_number: req.body.contact_number,
    class: req.body.class.toUpperCase(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
    .then(() => {
      console.log("Data added!");
      res.status(200).json({
        message: "Data Added Successfully!",
      });
    })
    .catch((error) => {
      console.log("Error while adding student data");
      // console.log(error.message);
      // console.log(error.name);
      console.log(error.errors[0].message);
      res.status(500).json({
        message: error.errors[0].message,
        errorType: error.message,
        // description: error.errors[0].message,
      });
    });
};
