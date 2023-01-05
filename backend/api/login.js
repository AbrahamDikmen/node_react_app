const express = require("express");
const model = require("../models/model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

// Add a new users to the db
router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(200).required(),
  });

  // Validate object
  const {error} = schema.validate(req.body);

  // Failed object
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  let user = await model.findOne({name: req.body.name});
  if (!user) return res.status(400).send("Invalid username or password");

  // Vlidate password
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid username or password");

  // Generate token
  const token = genAuthToken(user);
  res.send(token);
});

module.exports = router;
