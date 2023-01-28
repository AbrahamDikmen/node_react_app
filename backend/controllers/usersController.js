const express = require("express");

const model = require("../models/User");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const users = await model
      .find({_id: {$ne: req.params.id}})
      .select(["email", "name", "avatarImage", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
