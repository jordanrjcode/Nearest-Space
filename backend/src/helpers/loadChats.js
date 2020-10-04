const ChatList = require("../models/ChatList");
const Messages = require("../models/Messages");
const User = require("../models/Users");
exports.loadChats = async (id) => {
  try {
    let chatsDB = await ChatList.find({ users: id });
    if (chatsDB.length < 1) return { chatsDB: [] };
    return { chatsDB };
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.loadMessages = async (chatsRoom, username) => {
  let allmessages = await Messages.find({
    $or: [{ sender: username }, { receiver: username }],
  });
  return allmessages;
};
