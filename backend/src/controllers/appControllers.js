const Users = require("../models/Users");
const ChatList = require("../models/ChatList");
const Messages = require("../models/Messages");

exports.getUsers = async (req, res) => {
  const regex = new RegExp(`^${req.body.username}`, "gi");
  try {
    const listUsers = await Users.find({
      username: regex,
    });
    if (!listUsers) return res.status(404).json({ msg: "Not results" });
    res.status(200).json({ listUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.createChat = async (req, res) => {
  const { received } = req.body;
  console.log(received);
  try {
    let roomListExist = await ChatList.find({
      users: { $all: [req.user, received] },
    });
    console.log(roomListExist);
    if (roomListExist.length > 0)
      return res.status(400).json({ msg: "This chat already exist" });
    const sender = await Users.findById(req.user);
    let receivedDb = await Users.findById(received);
    if (!receivedDb) return res.status(404).json({ msg: "User not found" });
    let newSala = new ChatList({
      users: [req.user, received],
      user1: sender.username,
      user2: receivedDb.username,
    });
    await newSala.save();
    res.status(200).json({ msg: "Se ha creado la sala" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};
