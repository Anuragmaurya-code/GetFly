const express = require("express");
const connection = require("../dbconfig");
const { DataTypes } = require("sequelize");
const quantity = require("./quantity");
const Book = require("./Book");
const Student = require("./Student");

const LostBook = connection.define(
  "lost_books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity_id: {
      type: DataTypes.STRING,
      references: {
        model: quantity,
        key: "quantity_id",
      },
    },
    book_id: {
      type: DataTypes.STRING,
      references: {
        model: Book,
        key: "book_id",
      },
    },
    sid: {
      type: DataTypes.STRING,
      references: {
        model: Student,
        key: "sid",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = LostBook;
