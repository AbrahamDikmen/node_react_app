const asyncHandler = require("express-async-handler");
const Messages = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
// const router = express.Router();
// router.post("/getmsg", async (req, res) => {
//   try {
//     const {from, to} = req.body;

//     const messages = await Messages.find({
//       users: {
//         $all: [from, to],
//       },
//     }).sort({updatedAt: 1});

//     const projectedMessages = messages.map((msg) => {
//       return {
//         fromSelf: msg.sender.toString() === from,
//         message: msg.message.text,
//       };
//     });
//     res.json(projectedMessages);
//   } catch (ex) {
//     next(ex);
//   }
// });

// router.post("/addmsg", async (req, res) => {
//   try {
//     const {from, to, message} = req.body;
//     const data = await Messages.create({
//       message: {text: message},
//       users: [from, to],
//       sender: from,
//     });

//     if (data) return res.json({msg: "Message added successfully."});
//     else return res.json({msg: "Failed to add message to the database"});
//   } catch (ex) {
//     next(ex);
//   }
// });

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

  var newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Messages.create(newMessage);

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
// module.exports = router;
module.exports = {allMessages, sendMessage};
