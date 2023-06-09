const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../dbconfig");
const quantityModel = require("../models/quantity");

const issueBooks = connection.define(
  "Book_Issued",
  {
    issued_id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    issue_date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    sid: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    return_date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0,
    },
  },
  {
    freezeTableName: true,
    timeStamp: false,
    createdAt: false,
    updatedAt: false,
  }
);

issueBooks.belongsTo(quantityModel, {
  foriegnKey: "quantity_id",
});

module.exports = issueBooks;
