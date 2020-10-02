const ChatList = require("../models/ChatList");
const Users = require("../models/Users");
exports.getChatList = async (req, res) => {
  console.log(req.user);
  try {
    let chatsDB = await ChatList.find().map((chat) => {
      let chatSuccess = [];
      chat.users.map((user) => {
        if (user.toString === req.user) {
          chatSuccess.push(chat);
        }
      });
      return chatSuccess;
    });
    if (!chatsDB) return res.status(200).json({ msg: "You haven't chats" });
    res.status(200).json({ msg: chatSuccess });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.createChat = async (req, res) => {
  const { received } = req.params;
  try {
    let receivedDb = await Users.findById(received);
    if (!receivedDb) return res.status(404).json({ msg: "User not found" });
    let newChat = new ChatList({
      users: [{ user: received }, { user: req.user }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};
