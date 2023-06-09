const express = require("express");
const sequelize = require("sequelize");
const bookModel = require("../models/Book");
const issuedBooksModel = require("../models/issueBook");

module.exports = function getDashboardData(req, res) {
  var bookCount,
    issuedBooks,
    booksInCirculation = 0;
  // * Getting no.of Books
  bookModel
    .findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("quantity")), "total"]],
    })
    .then((data) => {
      console.log(data[0].dataValues.total);
      bookCount = data[0].dataValues.total;
      // console.log(data[0].dataValues.total);
      //   });
      // bookModel
      //   .count({ col: "book_id" })
      //   .then((count) => {
      //     console.log(count);
      //     bookCount = count;

      // * Getting the no.of issued Books
      issuedBooksModel.count({ col: "issued_id" }).then((count) => {
        issuedBooks = count;

        // * Getting the no.of books in Circulation
        issuedBooksModel
          .count({
            col: "issued_id",
            where: {
              isReturned: true,
            },
          })
          .then((count) => {
            booksInCirculation = count;
            // console.log("The no.of Circulated Book: ", count);

            // ! Sending Response
            res.status(200).json({
              booksCount: bookCount,
              issuedBooks: issuedBooks,
              circulationBooks: booksInCirculation,
              booksReissued: 0,
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};
