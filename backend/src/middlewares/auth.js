const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Verificar el token del header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Invalid Token" });
  }
};
