const { Schema, model } = require("mongoose");
const User = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Users", User);
