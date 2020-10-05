const ChatList = require("../models/ChatList");
const Messages = require("../models/Messages");
exports.loadChats = async (id) => {
  try {
    let chatsDB = await ChatList.find({ users: id });
    if (chatsDB.length < 1) return { chatsDB: [] };
    return { chatsDB };
  } catch (error) {
    return null;
  }
};

exports.loadMessages = async (username) => {
  let allmessages = await Messages.find({
    $or: [{ sender: username }, { receiver: username }],
  });
  return allmessages;
};
