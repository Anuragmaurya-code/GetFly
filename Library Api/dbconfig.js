const dotenv = require("dotenv");

dotenv.config();
// To get the variables from the dotenv file by using "process.env.VARIABLE_NAME"
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERPASS,
  process.env.USERPASS,
  {
    host: process.env.HOST,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   user: "root",
//   password: "root",
//   host: "localhost",
//   database: "Lib",
// });

// module.exports = connection;
// // const config = {
// //   user: "root",
// //   password: "root",
// //   server: "localhost",
// //   database: "arh",
// //   option: {
// //     trustedConnection: true,
// //     enableArithPort: true,
// //     instancename: "Local instance MySQL80",
// //   },
// //   port: 3306,
// // };

// // module.exports = config;
