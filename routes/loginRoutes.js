const { Router } = require("express");
const Contact = require("../model/Contact");
const router = new Router();

router.get("/", (req, res) => {
  res.render("login", { error: "" });
});

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
      const contacts = await Contact.find();
      req.session.user = login;
      console.log("Done!");
      res.render("admin", { contacts, login: req.session.user });
    } else {
      console.log("Wrong login or password!");
      res.render("login", { error: "Wrong login or password!" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
