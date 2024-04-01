const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  if (req.session && req.session.user) {
    res.render("admin", { login: req.session.user });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
