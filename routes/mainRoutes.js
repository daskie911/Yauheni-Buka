const { Router } = require("express");
const Contact = require("../model/Contact");
const Card = require("../model/Card");
const Skill = require("../model/Skill");
const sendGridMail = require("@sendgrid/mail");
const router = new Router();
sendGridMail.setApiKey(`${process.env.API_KEY}`);

router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    const cards = await Card.find().sort({ _id: -1 });
    const skills = await Skill.find().sort({ _id: -1 });
    res.render("index", { cards, contact, skills });
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
