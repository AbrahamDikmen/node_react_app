const express = require("express");
const router = express.Router();
require("dotenv").config();
const registerControlller = require("../controllers/registerController");
const messageControlller = require("../controllers/messageController");
const usersControlller = require("../controllers/usersController");
const setAvatarController = require("../controllers/setAvatarController");
const authController = require("../controllers/authController");
const routes = () => {
  router.use("/register", registerControlller);
  router.use("/auth", authController);
  router.use("/setAvatar", setAvatarController);
  router.use("/allusers", usersControlller);
  router.use("/messages", messageControlller);

  return router;
};
module.exports = routes;
