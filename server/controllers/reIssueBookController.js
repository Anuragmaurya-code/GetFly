const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function reIssueBook(req, res) {
  // * Getting the current data and making due and return date in specific format
  let date_ob = new Date();
  let issue_date =
    date_ob.getFullYear() +
    "-" +
    ("0" + (date_ob.getMonth() + 1)).slice(-2) +
    "-" +
    date_ob.getDate();
  let due_date =
    date_ob.getFullYear() +
    "-" +
    ("0" + (date_ob.getMonth() + 1)).slice(-2) +
    "-" +
    (date_ob.getDate() + 7);

  // * Getting the issueing details for the specific issued id
  issueBooks
    .findAll({
      where: {
        issued_id: req.body.issued_id,
      },
    })
    .then((data) => {
      if (data.lenght < 1) {
        res.send(200).json({
          message: "No data to display!",
        });
      } else {
        let d = data[0].dataValues; // ? Old id

        // * Creating new issue for that same book for 7 days
        issueBooks
          .create({
            book_id: d.book_id,
            issue_date: issue_date,
            due_date: due_date,
            sid: d.sid,
            isReturned: false,
            isReissued: false,
          })
          .then((data) => {
            console.log("Book Reissued!");

            // * Updating the old book data after issueing the book again
            issueBooks
              .update(
                {
                  return_date: issue_date,
                  isReturned: true,
                  isReissued: true,
                  reIssue_Id: data.dataValues.issued_id,
                },
                {
                  where: {
                    issued_id: d.issued_id,
                  },
                }
              )
              .then((data) => {
                console.log("Reissuing old book successfull!");

                //   * Sending response in order to let the user know that Book reissued
                res.status(200).json({
                  message: "Book Reissued Successfully!",
                });
              });
          });
      }
    })
    .catch((err) => {
      console.log("Something went wrong!");
      res.status(500).json({
        message: "Something went wrong!",
        err: err,
      });
    });
};
