const express = require("express");
const {
  registerUser,
  logIn,
  allUsers,
  logOut,
} = require("../controllers/authController");

const {getAvatar, postAvatar} = require("../controllers/setAvatarController");

const {getUsers, updateUsers} = require("../controllers/usersController");

require("dotenv").config();

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/setavatar/:id", postAvatar);
router.get("/setavatar/:id", getAvatar);

router.get("/allusers/:id", getUsers);
router.put("/allusers/:id", updateUsers);
module.exports = router;
