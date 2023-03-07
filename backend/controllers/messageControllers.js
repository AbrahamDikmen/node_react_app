const asyncHandler = require("express-async-handler");
const Messages = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Messages.find({chat: req.params.chatId})
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const {content, chatId} = req.body;
  const userId = {_id: req.params.id};
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  try {
    const message = await Messages.create(newMessage);

    message = await message.populate("sender", "name avatarImage");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatarImage",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {allMessages, sendMessage};
