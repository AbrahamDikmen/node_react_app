const express = require("express");
const model = require("../models/User");
// Add a new users to the db
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const userId = {_id: req.params.id};
  if (!userId) return res.status(400).send("Invalid id");
  let doc = await model.findById(userId);
  res.json(doc);
});

router.post("/:id", async (req, res, next) => {
  try {
    const userId = {_id: req.params.id};
    if (!userId) return res.status(400).send("Invalid id");

    const avatarImage = req.body.image;
    if (!avatarImage) return res.status(400).send("Invalid image");

    const userData = await model.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {new: true}
    );

    return res.json({
      isAvatarImageSet: userData.isAvatarImageSet,
      avatarImage: userData.avatarImage,
    });
  } catch (error) {
    res.send({error});
  }
});
module.exports = router;
