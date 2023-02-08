const model = require("../models/User");
const {roles} = require("../utils/constants");
const router = require("express").Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await model.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
