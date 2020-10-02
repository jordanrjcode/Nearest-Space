const { validationResult } = require("express-validator");

const validationFields = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(401).json({ msg: errors.errors[0].msg });
};

module.exports = validationFields;
