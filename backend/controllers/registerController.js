// const express = require("express");
// const model = require("../models/User");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");
// const {roles} = require("../utils/constants");
// const router = express.Router();
// require("dotenv").config();

// // Add a new users to the db
// router.post("/", async (req, res) => {
//   // Schema for register user
//   const pattern =
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

//   const schema = Joi.object({
//     name: Joi.string().min(8).max(20).required().label("Name field"),

//     email: Joi.string()

//       .max(40)
//       .required("Password is required")
//       .email()
//       .label("Email is required"),

//     password: Joi.string().min(8).regex(RegExp(pattern)).required().messages({
//       "string.pattern.base": "",
//       "string.min": "",
//     }),

//     repeat_password: Joi.any()
//       .equal(Joi.ref("password"))
//       .required("Password is required")
//       .label("Password")
//       .options({messages: {"any.only": "{{#label}} does not match"}}),
//   });
//   // Check if schema values are good to go
//   const {error} = schema.validate(req.body);
//   console.log(schema);
//   if (error) return res.status(400).send(error.details[0].message);

//   // Check through usernames and emails if the names already exists

//   let user = await model.findOne({name: req.body.name});
//   let email = await model.findOne({email: req.body.email});
//   let adminCheck = req.body.email;
//   if (user)
//     return res.status(400).send("Username already exist..try another one");

//   if (email)
//     return res.status(400).send("Email already exist..try another one");

//   // Create new user model
//   user = new model({
//     email: req.body.email,
//     name: req.body.name,
//     password: req.body.password,
//     repeat_password: req.body.repeat_password,
//   });

//   const salt = await bcrypt.genSalt(10);

//   // Hash password ( Protection against hackers for the database )
//   user.password = await bcrypt.hash(user.password, salt);
//   user.repeat_password = await bcrypt.hash(user.repeat_password, salt);
//   if (adminCheck === process.env.ADMIN_EMAIL.toLocaleLowerCase()) {
//     user.role = roles.admin;
//   }

//   user = await user.save();

//   // Generate token for the registred user

//   res.send(user);
// });

// // Delete a users from the db
// router.delete("/:id", async (req, res, next) => {
//   try {
//     let doc = await model.findByIdAndDelete({_id: req.params.id});
//     res.json(doc);
//   } catch (error) {
//     res.send({error});
//   }
// });

// module.exports = router;
