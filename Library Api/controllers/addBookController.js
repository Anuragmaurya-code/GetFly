const express = require("express");
const Book = require("../models/Book");
const quantity = require("../models/quantity");

module.exports = function addBook(req, res) {
  console.log(req.body.book_id);
  var quant_Id = req.body.book_id + req.body.quantity;
  Book.create(req.body)
    .then((data) => {
      console.log(data);
      quantity
        .create({
          quantity_id: quant_Id,
          book_id: req.body.book_id,
          isLost: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
        .then((data) => {
          res.send("Data added successfully!");
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
