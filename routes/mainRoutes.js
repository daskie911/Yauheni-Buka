const express = require("express");
const app = express();
const Contact = require("../model/Contact");
const Card = require("../model/Card");


app.get("/", async (req, res) => {
  try{
    const contact = await Contact.findOne();
    const cards = await Card.find();
    res.render("index", { cards, contact });
  }
  catch(err){
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = app;
