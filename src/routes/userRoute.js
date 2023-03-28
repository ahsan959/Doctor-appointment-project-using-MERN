const express = require("express");

const {
  register,
  login,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
  getAllUsers,
  getAllDoctor,
  changeAccountStatus,
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
router.get("/getAllUser", getAllUsers);
router.get("/getAllDoctor", getAllDoctor);

// change account status
router.post("/changeAccountStatus", changeAccountStatus);

module.exports = router;
