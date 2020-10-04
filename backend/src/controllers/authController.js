const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const validationFields = require("../helpers/validator");
const setToken = require("../helpers/setToken");

exports.login = async (req, res) => {
  validationFields(req, res);
  const { username, password } = req.body;
  try {
    let userDB = await User.findOne({ username });
    if (!userDB)
      return res.status(400).json({ msg: "This username does not exists" });
    let passwordCorrect = await bcrypt.compare(password, userDB.password);
    if (!passwordCorrect)
      return res.status(401).json({ msg: "Incorrect password" });
    setToken(res, userDB._id);
  } catch (error) {
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.register = async (req, res) => {
  validationFields(req, res);
  const { password, username, email } = req.body;
  try {
    let userDB = await User.findOne({ $or: [{ username }, { email }] });
    if (userDB)
      return res
        .status(400)
        .json({ msg: "This username or email  already exist" });
    let newUser = new User(req.body);
    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();
    setToken(res, newUser._id);
  } catch (error) {
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findById(req.user);
    if (!user) return res.status(401).json({ msg: "User dont exist" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.editUser = async (req, res) => {
  validationFields(req, res);
  const { state } = req.body;
  try {
    let userUpdate = await User.findByIdAndUpdate(req.user, {
      $set: {
        state: state,
      },
    });
    res.status(200).json({ user: userUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.aggContact = async (req, res) => {
  validationFields(req, res);
  const { invited } = req.body;
  try {
    let invitedDB = await User.findById(invited);
    if (!invitedDB) return res.status(404).json({ msg: "User not found" });
    if (invitedDB.contacts.lenght > 0) {
      invitedDB.contacts.map((contactsMap) => {
        if (contactsMap === req.user) {
          return res
            .status(404)
            .json({ msg: "User already exist in your contacts list" });
        }
      });
    }
    let contactsI = invitedDB.contacts;
    contactsI.push(req.user);
    let user = await User.findById(req.user);
    let contactsU = user.contacts;
    contactsU.push(invited);
    let newContacts = await User.update(user, {
      $set: {
        contacts: contactsU,
      },
    });
    let newInvited = await User.update(invitedDB, {
      $set: {
        contacts: contactsI,
      },
    });
    res.status(200).json({ msg: "Exit in the operation" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};
