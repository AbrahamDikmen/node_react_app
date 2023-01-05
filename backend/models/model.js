const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Create user Schema & model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  repeat_password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const model = mongoose.model("user", userSchema);
module.exports = model;
