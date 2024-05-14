const { Router } = require("express");
const Contact = require("../model/Contact");
const Card = require("../model/Card");
const Skill = require("../model/Skill");
const Review = require("../model/Review");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    const cards = await Card.find().sort({ _id: -1 });
    const skills = await Skill.find().sort({ _id: -1 });
    const review = await Review.find().sort({ _id: -1 });
    res.render("index", { cards, contact, skills, review });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.post("/email", async (req, res) => {
  try {
    const { title, email, message } = req.body;
    console.log(title, email, message);
    const msg = {
      to: "darkpunky94@gmail.com",
      from: email,
      subject: title,
      text: message,
    };
    sendGridMail.send(msg);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
