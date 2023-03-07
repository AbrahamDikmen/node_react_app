const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

require("dotenv").config();

// Initialize routess

const getAvatar = asyncHandler(async (req, res) => {
  const userId = {_id: req.params.id};
  if (!userId) return res.status(400).send("Invalid id");
  let doc = await User.findById(userId);
  res.json(doc);
});

const postAvatar = asyncHandler(async (req, res) => {
  try {
    const userId = {_id: req.params.id};
    if (!userId) return res.status(400).send("Invalid id");

    const avatarImage = req.body.image;
    if (!avatarImage) return res.status(400).send("Invalid image");

    const userData = await User.findByIdAndUpdate(
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
module.exports = {getAvatar, postAvatar};
