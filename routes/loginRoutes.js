const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login === process.env.LOGIN && password === process.env.PASSWORD) {
      req.session.user = login;
      console.log("Done!");
      res.redirect("/");
    } else {
      console.log("Wrong login or password!");
      res.render("admin", { error: "Wrong login or password!" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
