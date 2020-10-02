const { Schema, model, Types } = require("mongoose");
const MessagesSchema = new Schema({
  message: { type: String, required: true },
  id_chatList: { type: Types.ObjectId, ref: "Chatlist" },
  sender: { type: Types.ObjectId, ref: "Users" },
  receiver: { type: Types.ObjectId, ref: "Users" },
});

module.exports = model("messagecontent", MessagesSchema);
