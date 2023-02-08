const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

// Sett up express app

const app = express();

require("dotenv").config();

// Initialize routess
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", routes());
app.use("/api/admin", routes());

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {orgin: "*", credentials: true},
});

// DB Connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Check DB Connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Listen to port
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listning to port ${port}`));

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
