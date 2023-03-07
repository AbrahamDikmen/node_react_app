const express = require("express");
const {
  sendLink,
  setNewPassword,
  verifyToken,
} = require("../controllers/passwordResetController");

const router = express.Router();

router.post("/", sendLink);
router.route("/:id/:token").get(verifyToken);
router.route("/:id/:token").post(setNewPassword);
module.exports = router;
