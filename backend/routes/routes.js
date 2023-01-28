const express = require("express");

const registerControlller = require("../controllers/registerController");

const loginControlller = require("../controllers/loginController");

const messageControlller = require("../controllers/messageController");

const setAvatarControlller = require("../controllers/setAvatarController");

const usersControlller = require("../controllers/usersController");
const routes = () => {
  const router = express.Router();

  router.use("/register", registerControlller);
  router.use("/auth", loginControlller);
  router.use("/setAvatar", setAvatarControlller);
  router.use("/allusers", usersControlller);
  router.use("/messages", messageControlller);
  return router;
};
module.exports = routes;
