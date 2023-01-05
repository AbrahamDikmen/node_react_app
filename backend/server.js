const express = require("express");
const mongoose = require("mongoose");
const register = require("./api/register");
const bodyParser = require("body-parser");
const login = require("./api/login");
const passwordReset = require("./api/passwordReset");

// Sett up express app
const app = express();
require("dotenv").config();

// Initialize routess
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/register", register);
app.use("/login", login);
app.use("/password-reset", passwordReset);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

// DB Connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check DB Connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Listen to port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listning to port ${port}`));
