const { Schema, model } = require("mongoose");
const MessagesSchema = new Schema({
  message: { type: String, required: true },
  name: { type: String },
  timeStamp: { type: String },
});

module.exports = model("messagecontent", MessagesSchema);
