const express = require("express");

const {
  register,
  login,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Home/authuntication
router.post("/getUserData", authMiddleware, authController);

// Applying as a Doctor
router.post("/applyDoctor", authMiddleware, applyDoctor);
router.post("/getAllNotification", authMiddleware, getAllNotification);
router.post("/deleteAllNotification", authMiddleware, deleteAllNotification);
module.exports = router;
