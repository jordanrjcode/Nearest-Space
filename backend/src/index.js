const express = require("express");
const morgan = require("morgan");
const conectarDB = require("./database");
const cors = require("cors");
const loadChat = require("./helpers/loadChats");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Message = require("./models/Messages");
const Users = require("./models/Users");
const ChatList = require("./models/ChatList");

conectarDB();
app.use(cors());

let usersConnected = {};
io.on("connection", (socket) => {
  socket.on("connected", async (id, username) => {
    usersConnected[username] = socket.id;
    const chats = await loadChat.loadChats(id);
    const messages = await loadChat.loadMessages(username);
    socket.emit("loadChats", chats.chatsDB, messages);
  });
  socket.on("message", async function (data) {
    let newmessage = new Message(data);
    await newmessage.save();
    io.to(usersConnected[data.receiver]).emit("whisper", {
      idchatList: data.idchatList,
      message: data.message,
      sender: data.sender,
      receiver: data.receiver,
    });
  });
  socket.on("newroom", async (data) => {
    let roomListExist = await ChatList.find({
      users: data.users,
    });
    if (roomListExist.length > 0) return;
    const newChat = new ChatList({
      users: data.userS,
      user1: data.user1,
      user2: data.user2,
    });
    if (data.senderComplete.contacts.length > 0) {
      data.senderComplete.contacts.map((contactsMap) => {
        if (contactsMap !== data.user2._id) return;
      });
    }
    await Users.updateOne(data.receiverComplete, {
      $push: {
        contacts: data.senderComplete._id,
      },
    });
    await Users.updateOne(data.senderComplete, {
      $push: {
        contacts: data.receiverComplete._id,
      },
    });
    await newChat.save();
    io.to(usersConnected[data.user2]).emit("loadroom", newChat);
  });
});

const port = process.env.PORT || 4000;
app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/app", require("./routes/app.routes"));

http.listen(port, function () {
  console.log("Server is running!");
});
