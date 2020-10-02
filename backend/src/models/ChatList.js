const { Schema, model, Types } = require("mongoose");
const ChatList = new Schema({
  users: { type: Array, required: true },
});
module.exports = model("Chatlist", ChatList);
