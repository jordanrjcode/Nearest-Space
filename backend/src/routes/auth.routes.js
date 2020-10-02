const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const router = Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "The password must have a minimum of 6 characters"
    ).isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  authController.login
);

router.get("/user", auth, authController.getUser);

module.exports = router;
