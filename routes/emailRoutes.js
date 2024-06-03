const { name } = require("ejs");
const { Router } = require("express");
const router = new Router();
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;

router.post("/send", async (req, res) => {
  const apiIntance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sender = {
    email: "darkpunky94@gmail.com",
    name: "Daskie",
  };

  const receivers = [
    {
      email: req.body.email,
      name: req.body.name,
    },
  ];
  try {
    const sendEmail = await apiIntance.sendTransacEmail({
      sender,
      to: receivers,
      Subject: req.body.subject,
      textContent: req.body.message,
      htmlContent: "<strong>This is a test email from Daskie</strong>",
    });
    return res.send({ message: "Email sent successfully sent" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
