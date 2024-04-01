const { Router } = require("express");

const router = new Router();

router.post("/", async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
