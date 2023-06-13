// ! New Code
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./dbconfig");

// ! Routes importing
const loginRoute = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
const addBookRoute = require("./routes/addBook");
const issueBookRouter = require("./routes/issueBook");
const issues = require("./routes/issues");
const reIssueBookRouter = require("./routes/reIssueBook");
const collectBookRouter = require("./routes/collectBook");
const addStudentRoute = require("./routes/addStudent");
const reportsRoute = require("./routes/reports");

const dotenv = require("dotenv");

dotenv.config(); // * To get the variables from the dotenv file by using "process.env.VARIABLE_NAME"

app.use(
  bodyParser.json({
    limit: "1mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection with database established successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// ! Importing Models
const userModel = require("./models/User");
const studentModel = require("./models/Student");
const issueBookModel = require("./models/issueBook");
const quantityModel = require("./models/quantity");
const bookModel = require("./models/Book");

sequelize.sync().then((data) => {
  // console.log(data);
  console.log("All tables synced");
});

// ! Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/login", loginRoute);
app.use("/dashboard", dashboardRoute);
app.use("/addBook", addBookRoute);
app.use("/issueBook", issueBookRouter);
app.use("/issues", issues);
app.use("/reIssueBook", reIssueBookRouter);
app.use("/collectBook", collectBookRouter);
app.use("/addStudent", addStudentRoute);
app.use("/report", reportsRoute);

app.listen(
  process.env.PORT || 5002,
  console.log("App listening on port", process.env.PORT, "!")
);
