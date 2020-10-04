const { Router } = require("express");
const router = Router();
const appController = require("../controllers/appControllers");
const auth = require("../middlewares/auth");

router.post("/users", auth, appController.getUsers);

module.exports = router;
