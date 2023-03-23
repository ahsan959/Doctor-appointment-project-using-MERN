const express = require("express");

const {
  register,
  login,
  authController,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Home/authuntication
router.post("/getUserData", authMiddleware, authController);
module.exports = router;
