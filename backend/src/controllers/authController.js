const bcrypt = require("bcryptjs");
const User = require("../models/Usuarios");
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
  console.log(req.user);
  try {
    let user = await User.findById(req.user);
    if (!user) return res.status(401).json({ msg: "User dont exist" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};
