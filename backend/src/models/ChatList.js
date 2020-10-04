const { Schema, model, Types } = require("mongoose");
const ChatList = new Schema({
  users: { type: Array, required: true },
  user1: { type: String },
  user2: { type: String },
});
module.exports = model("Chatlist", ChatList);
