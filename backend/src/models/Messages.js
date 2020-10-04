const { Schema, model, Types } = require("mongoose");
const MessagesSchema = new Schema({
  message: { type: String, required: true },
  idchatList: { type: Types.ObjectId, ref: "Chatlist" },
  // users: { type: Array },
  sender: { type: String, trim: true, lowercase: true },
  receiver: { type: String, trim: true, lowercase: true },
  date: { type: Date, default: Date.now() },
});

module.exports = model("messagecontent", MessagesSchema);
