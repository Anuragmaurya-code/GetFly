const express = require("express");
const issueBooks = require("../models/issueBook");
const { Op } = require("sequelize");
const LostBook = require("../models/LostBook");

module.exports = function generateReport(req, res) {
  console.log(req.query);

  //  ! Issued Books reports generating from a specific day to a specific day
  if (req.query.reportName == "issuedBooks") {
    issueBooks
      .findAll({
        where: {
          issue_date: {
            [Op.between]: [
              req.query.startDate,
              req.query.endDate || Date.now(),
            ],
          },
          sid: req.body.sid,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: true,
            message: "No data to show",
            data: []
          });
        } else {
          console.log(data);
          res.status(200).json({
            result: true,
            message: "Issued Books data",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.status(500).send({
          result: false,
          message: "something went wrong while generating issued books report",
          error: err,
        });
      });
    //   ! Reissueing Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "reIssuedBooks") {
    issueBooks
      .findAll({
        where: {
          issue_date: {
            [Op.between]: [
              req.query.startDate,
              req.query.endDate || Date.now(),
            ],
          },
          isReissued: true,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: true,
            message: "No data to show",
            data: [],
          });
        } else {
          res.status(200).json({
            result: true,
            message: "reIssued Books data",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
      });
    // ! Circulated Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "circulatedBooks") {
    issueBooks
      .findAll({
        where: {
          issue_date: {
            [Op.between]: [
              req.query.startDate,
              req.query.endDate || Date.now(),
            ],
          },
          isReturned: false,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: true,
            message: "No data to show",
            data: [],
          });
        } else {
          res.status(200).json({
            result: true,
            message: "Circulated Books data",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
      });
    // ! Due dated Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "dueDatedBooks") {
    issueBooks
      .findAll({
        where: {
          due_date: {
            [Op.between]: [
              req.query.startDate,
              req.query.endDate || Date.now(),
            ],
          },
          isReturned: false,
        },
      })
      .then((data) => {
        console.log("Data fetched succesfully!");
        console.log(data.length);
        if (data.length < 1) {
          res.status(200).json({
            result: true,
            message: "No data to show",
            data: [],
          });
        } else {
          res.status(200).json({
            result: true,
            message: "Due Books data",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
      });
    // ! Lost Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "lostBooks") {
    LostBook.findAll({
      where: {
        date: {
          [Op.between]: [req.query.startDate, req.query.endDate || Date.now()],
        },
        // isReturned: false,
      },
    }).then((data) => {
      console.log("Data fetched succesfully!");
      console.log(data.length);
      if (data.length < 1) {
        res.status(200).json({
          result: true,
          message: "No data to show",
          data: [],
        });
      } else {
        res.status(200).json({
          result: true,
          message: "Lost Books data",
          data: data,
        });
      }
    })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
      });
  }
};
