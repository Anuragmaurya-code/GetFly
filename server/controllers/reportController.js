const express = require("express");
const issueBooks = require("../models/issueBook");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");
const LostBook = require("../models/LostBook");
const workbook = new ExcelJS.Workbook();

module.exports = function generateReport(req, res) {
  console.log(req.query);
  workbook.removeWorksheet(req.query.reportName);

  //  ! Issued Books reports generating from a specific day to a specific day
  if (req.query.reportName == "issuedBooks") {
    workbook.removeWorksheet("Issued Book (" + req.query.startDate + " )");
    const sheet = workbook.addWorksheet(
      "Issued Book (" + req.query.startDate + " )"
    );

    issueBooks
      .findAll({
        where: {
          issue_date: {
            [Op.between]: [
              req.query.startDate,
              req.query.endDate || Date.now(),
            ],
          },
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            message: "No data to show",
          });
        } else {
          //   console.log(data);
          // * Making headers in the Excel File
          sheet.columns = [
            { header: "ID", key: "issued_id", width: 10 },
            { header: "Book Id", key: "quantity_id", width: 20 },
            { header: "Issue Date", key: "issue_date", width: 25 },
            { header: "Due Date", key: "due_date", width: 25 },
            { header: "Student Id", key: "sid", width: 15 },
            { header: "Book Collected", key: "isReturned", width: 15 },
          ];
          i = 2;
          //   * Writing the database data in the excel file
          data.forEach((element) => {
            sheet.addRow({
              issued_id: element.issued_id,
              quantity_id: element.quantity_id,
              issue_date: element.issue_date,
              due_date: element.due_date,
              sid: element.sid,
              isReturned: element.isReturned == true ? "Yes" : "No",
            });
            console.log(i);
            sheet.addConditionalFormatting({
              ref: "F" + i,
              rules: [
                {
                  priority: 1, // add this
                  type: "containsText",
                  operator: "containsText",
                  text: "Yes",
                  style: {
                    fill: {
                      type: "pattern",
                      pattern: "solid",
                      bgColor: { argb: "ffa4ffa4" },
                      fgColor: { argb: "ff006100" },
                    },
                  },
                },
              ],
            });

            sheet.addConditionalFormatting({
              ref: "F" + i,
              rules: [
                {
                  priority: 1, // add this
                  type: "containsText",
                  operator: "containsText",
                  text: "No",
                  style: {
                    fill: {
                      type: "pattern",
                      pattern: "solid",
                      bgColor: { argb: "ffffc7ce" },
                      fgColor: { argb: "ff9c0006" },
                    },
                  },
                },
              ],
            });
            i++;
          });

          //   * Sending the issued Books data
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          workbook.xlsx.write(res);
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
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
            message: "No data to show",
          });
        } else {
          res.status(200).json(data);
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
            message: "No data to show",
          });
        } else {
          res.status(200).json(data);
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
            message: "No data to show",
          });
        } else {
          res.status(200).json(data);
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
      console.log(data);
      res.status(200).json({
        result: true,
        data: data,
      });
    });
  }
};
