const express = require("express");
const model = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();
require("dotenv").config();

// Get a list of users from the db
router.get("/", async (req, res, next) => {
  let doc = await model.find();
  res.json(doc);
});

// Add a new users to the db
router.post("/", async (req, res) => {
  // Schema for register user
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required().label("Name field"),

    email: Joi.string()
      .min(5)
      .max(200)
      .required("Password is required")
      .email()
      .label("Email is required"),

    password: Joi.string().min(8).regex(RegExp(pattern)).required().messages({
      "string.pattern.base": "",
      "string.min": "",
    }),

    repeat_password: Joi.any()
      .equal(Joi.ref("password"))
      .required("Password is required")
      .label("Password")
      .options({messages: {"any.only": "{{#label}} does not match"}}),
  });
  // Check if schema values are good to go
  const {error} = schema.validate(req.body);
  console.log(schema);
  if (error) return res.status(400).send(error.details[0].message);

  // Check through usernames and emails if the names already exists

  let email = await model.findOne({email: req.body.email});
  let user = await model.findOne({name: req.body.name});

  if (user)
    return res.status(400).send("Username already exist..try another one");

  if (email)
    return res.status(400).send("Email already exist..try another one");

  // Create new user model
  user = new model({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    repeat_password: req.body.repeat_password,
  });

  const salt = await bcrypt.genSalt(10);

  // Hash password ( Protection against hackers for the database )
  user.password = await bcrypt.hash(user.password, salt);

  user.repeat_password = await bcrypt.hash(user.repeat_password, salt);
  user = await user.save();

  // Generate token for the registred user

  const token = genAuthToken(user);

  res.send(token);
});

// Update a users in the db
router.put("/:id", async (req, res, next) => {
  try {
    let doc = await model.findByIdAndUpdate({_id: req.params.id}, req.body, {
      new: true,
    });
    res.json(doc);
  } catch (error) {
    res.send({error});
  }
});

// Delete a users from the db
router.delete("/:id", async (req, res, next) => {
  try {
    let doc = await model.findByIdAndDelete({_id: req.params.id});
    res.json(doc);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;
