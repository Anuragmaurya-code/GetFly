const express = require("express");
const sequelize = require("sequelize");
const bookModel = require("../models/Book");
const issuedBooksModel = require("../models/issueBook");

module.exports = function getDashboardData(req, res) {
  // * Date Calculation for query & formatting date
  let date_ob = new Date();
  let date =
    date_ob.getFullYear() +
    "-" +
    ("0" + (date_ob.getMonth() + 1)).slice(-2) +
    "-" +
    date_ob.getDate();

  // * Variables for making JSON for response
  var bookCount,
    issuedBooks,
    booksInCirculation,
    reIssuedBooks = 0;

  // * Getting no.of Books
  bookModel
    .findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("quantity")), "total"]],
    })
    .then((data) => {
      bookCount = Number(data[0].dataValues.total);

      // * Getting the no.of issued Books current day
      issuedBooksModel
        .count({
          col: "issued_id",
          where: {
            issue_date: date,
          },
        })
        .then((count) => {
          issuedBooks = count;

          // * Getting the no.of books in Circulation
          issuedBooksModel
            .count({
              col: "issued_id",
              where: {
                isReturned: false,
              },
            })
            .then((count) => {
              booksInCirculation = count;
              // console.log("The no.of Circulated Book: ", count);
              // * Getting the no.of books Reissued current day
              issuedBooksModel
                .count({
                  col: "issued_id",
                  where: {
                    isReissued: true,
                  },
                })
                .then((count) => {
                  reIssuedBooks = count;

                  // ! Sending Response
                  res.status(200).json({
                    booksCount: bookCount,
                    issuedBooks: issuedBooks,
                    circulationBooks: booksInCirculation,
                    booksReissued: reIssuedBooks,
                  });
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
