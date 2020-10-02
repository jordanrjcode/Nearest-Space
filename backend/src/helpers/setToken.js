const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (res, id) => {
  let payload = {
    user: id,
  };
  jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: 3600,
    },
    (error, token) => {
      if (error) return res.status(500).json({ msg: "There was a mistake" });
      return res.json({ token });
    }
  );
};
