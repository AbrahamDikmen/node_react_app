const express = require("express");

const model = require("../models/Roles");
const router = express.Router();

router.post("/add-role", async (req, res) => {
  const role = req.body.role;
  const permissions = req.body.permissions;
  const newRole = await new model({role, permissions});

  const isSaved = await newRole.save();

  if (isSaved) {
    return res.send({code: 200, message: "role added"});
  } else {
    return res.send({code: 500, message: "server error"});
  }
});

router.post("/delete-role", async (req, res) => {
  return res.send({code: 200, message: "role deleted"});
});
module.exports = router;
