const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.KEY, (err, authData) => {
      if (err) {
        res.send({ message: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.send({
      result: "token is not valid",
    });
  }
}

module.exports = verifyToken;
