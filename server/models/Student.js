const Sequelize = require("sequelize");
const connection = require("../dbconfig"); // * For getting the connection variable
const Student = connection.define(
  "Student",
  {
    sid: {
      type: Sequelize.DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    class: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
  }
  //   function (require, factory) {
  //     "use strict";
  //   }
);

// Student.sync()
//   .then((data) => console.log("Student table synced successfully!"))
//   .catch((err) => console.log("Syncing failed"));

// function getStudents() {
//   Student.findAll({
//     attributes: ["sid"],
//   })
//     .then((data) => {
//       return data;
//       //   var j;
// data.forEach((element) => {
//   j = element.toJSON();
//   // console.log(element.toJSON());
//   console.log(j);
// });
//       //   return j;
//       //   console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// }

module.exports = Student;
