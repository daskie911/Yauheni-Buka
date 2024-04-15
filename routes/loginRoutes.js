const { Router } = require("express");
const Contact = require("../model/Contact");
const Card = require("../model/Card");
const router = new Router();

router.get("/", (req, res) => {
  res.render("login", { error: "" });
});

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
      const cards = await Card.find(); // get all cards
      const contacts = await Contact.find(); // get all contacts
      req.session.user = login; // set session user
      console.log("Done!");
      res.render("admin", { contacts, login: req.session.user, cards }); // render admin page with contacts and cards
    } else {
      console.log("Wrong login or password!");
      res.render("login", { error: "Wrong login or password!" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
