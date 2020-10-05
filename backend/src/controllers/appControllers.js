const Users = require("../models/Users");
const ChatList = require("../models/ChatList");
const Messages = require("../models/Messages");
const validationFields = require("../helpers/validator");

exports.getUsers = async (req, res) => {
  const regex = new RegExp(`^${req.body.username}`, "gi");
  try {
    const listUsers = await Users.find({
      username: regex,
    }).select("-password");
    if (!listUsers) return res.status(404).json({ msg: "Not results" });
    res.status(200).json({ listUsers });
  } catch (error) {
    res.status(500).json({ msg: "There was a mistake" });
  }
};
