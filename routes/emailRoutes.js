const { Router } = require("express");
const sendGridMail = require("@sendgrid/mail");
const router = new Router();
sendGridMail.setApiKey(`${process.env.API_KEY}`);

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
