const { Router } = require("express");
const Contact = require("../model/Contact");
const Card = require("../model/Card");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const cards = await Card.find(); // get all cards
      const contacts = await Contact.find(); // get all contacts
      res.render("admin", { contacts, login: req.session.user, cards }); // render admin page with contacts and cards
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/editContacts/:id", async (req, res) => {
  // edit contact
  try {
    if (req.session && req.session.user) {
      const { id } = req.params; // get id from url
      const { email, phone } = req.body;
      const existingContact = await Contact.findById(id); // get contact by id

      if (!existingContact) {
        // if contact not found
        return res.redirect("/");
      }
      // update contact phone and email
      existingContact.email = email;
      existingContact.phone = phone;
      await existingContact.save(); // save contact

      res.redirect("/admin"); // redirect to admin page
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/addCards", async (req, res) => {
  // add cards
  try {
    if (req.session && req.session.user) {
      const { image, title, description, link } = req.body;
      const newCard = new Card({ image, title, description, link });
      await newCard.save();
      res.redirect("/admin");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.post("/editCards/:id", async (req, res) => {
  // edit cards
  try {
    if (req.session && req.session.user) {
      const { id } = req.params; // get id from url
      const { image, title, description, link } = req.body;
      const existingCard = await Card.findById(id); // get card by id

      if (!existingCard) {
        // if card not found
        return res.redirect("/");
      }
      // update card image, title, description, link
      existingCard.image = image;
      existingCard.title = title;
      existingCard.description = description;
      existingCard.link = link;
      await existingCard.save(); // save card

      res.redirect("/admin"); // redirect to admin page
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
