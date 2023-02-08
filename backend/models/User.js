const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {roles} = require("../utils/constants");
// Create user Schema & model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  repeat_password: {
    type: String,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.client],
    default: roles.client,
  },
});



const model = mongoose.model("user", userSchema);
module.exports = model;
