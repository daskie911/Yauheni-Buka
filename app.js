const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT || 7000;
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/mainRoutes");
const loginRoutes = require("./routes/loginRoutes");
const logOutRoutes = require("./routes/logOutRoutes");
const adminRoutes = require("./routes/adminRoutes");
const emailRoutes = require("./routes/emailRoutes");

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(
  session({
    secret: `${process.env.USERNAME}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", mainRoutes);
app.use("/admin", adminRoutes);
app.use("/logOut", logOutRoutes);
app.use("/zhenyaLogin", loginRoutes);
app.use("/email", emailRoutes);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
