const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../dbconfig");
const quantityModel = require("../models/quantity");
const Book = require("./Book");
const Student = require("./Student");

const issueBooks = connection.define(
  "Book_Issued",
  {
    issued_id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      refernces: {
        model: Book,
        key: "book_id",
      },
    },
    issue_date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    sid: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      refernces: {
        model: Student,
        key: "sid",
      },
    },
    return_date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: true,
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    isReissued: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    reIssue_Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timeStamp: false,
    createdAt: false,
    updatedAt: false,
  }
);

// issueBooks.belongsTo(quantityModel, {
//   foriegnKey: "quantity_id",
// });

module.exports = issueBooks;
