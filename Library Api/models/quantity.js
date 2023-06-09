const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const quantity = sequelize.define(
  "quantity",
  {
    quantity_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    freezeTableName: true,
    timeStamps: false,
    tableName: "quantity",
  }
);

module.exports = quantity;
