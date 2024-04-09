const express = require("express");
const app = express();
const Contact = require("../model/Contact");
const Card = require("../model/Card");

app.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.render("index", { contact });
});

// i need add editing cards for admin and i need edit portfolio in index.ejs

app.get("/", async (req, res) => {
  try{
    const cards = await Card.find();
    res.render("index", { cards });
  }
  catch(err){
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = app;
