const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../dbconfig");

const User = connection.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync()
//   .then((data) => {
//     console.log("User table synced successfully!");
//   })
//   .catch((err) => {
//     console.log("User table synced failed!", err);
//   });

module.exports = User;
