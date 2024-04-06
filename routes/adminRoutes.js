const { Router } = require("express");
const Contact = require("../model/Contact");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const contacts = await Contact.find();
      console.log(contacts);
      res.render("admin", { contacts, login: req.session.user });
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/add", async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const contact = new Contact({
        phone: req.body.phone,
        email: req.body.email,
      });
      await contact.save();
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
