
const express = require("express");
const { sendEmail } = require("./email");
require('dotenv').config()
const app = express();

app.get("/send-email?", (req, res) => {
    console.log(req.query.email);
  sendEmail(
    req.query.email,
    "Galang",
    "Galang Rambo Anarki"
  );
  res.send("send email success");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", process.env.PORT);
});