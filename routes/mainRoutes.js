const express = require("express");
const app = express();
const Contact = require("../model/Contact");

app.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.render("index", { contact });

});

module.exports = app;
