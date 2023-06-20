const express = require("express");
const LostBook = require("../models/LostBook");
const quantity = require("../models/quantity");

module.exports = function addLostBook(req, res) {
  console.log(req.body);
  let b = req.body;
  LostBook.create({
    quantity_id: b.quantity_id,
    book_id: b.book_id,
    sid: b.sid,
    date: b.date,
  })
    .then((data) => {
      console.log(data);
      quantity
        .findOne({
          where: {
            quantity_id: b.quantity_id,
          },
        })
        .then((data) => {
          console.log(data);
          let a = data.dataValues.available_quantity - 1;
          quantity.update(
            {
              available_quantity: a,
            },
            {
              where: {
                quantity_id: b.quantity_id,
              },
            }
          );
        })
        .then((data) => {
          console.log(data);
          res
            .status(200)
            .json({ result: true, message: "Lost book added successfully!" });
        });
    })
    .catch((err) => {
      console.log("Something went wrong while adding lost book data!");
      res.status(500).json({
        result: false,
        message: "Something went wrong while adding lost book data!",
        error: err,
      });
    });
};
