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
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: "quantity",
  }
);

module.exports = quantity;
