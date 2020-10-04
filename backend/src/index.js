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
conectarDB();
app.use(cors());

let usersConnected = {};
io.on("connection", (socket) => {
  socket.on("connected", async (id, username) => {
    usersConnected[username] = socket.id;
    const chats = await loadChat.loadChats(id);
    const messages = await loadChat.loadMessages(chats.chatsDB, username);
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
});

const port = process.env.PORT || 4000;
app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/app", require("./routes/app.routes"));

http.listen(port, function () {
  console.log("Server is running!");
});
