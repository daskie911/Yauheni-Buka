const { Router } = require("express");
const Contact = require("../model/Contact");
const Card = require("../model/Card");
const router = new Router();

router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    const cards = await Card.find().sort({ _id: -1 });
    res.render("index", { cards, contact });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
