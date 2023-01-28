const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const model = mongoose.model("user", userSchema);
module.exports = model;
