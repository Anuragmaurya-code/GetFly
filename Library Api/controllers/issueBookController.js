const express = require("express");

module.exports = function issueBook(req, res) {
  console.log(req.body);
  res.send("Inside Issue Book");
};
