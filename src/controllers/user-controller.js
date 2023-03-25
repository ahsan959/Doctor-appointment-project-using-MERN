const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check user already have an account
    const exisitingUser = await User.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "Already have an account", success: false });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({
      success: true,
      message: "new user created",
      data: user,
      err: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "we are enable to create user",
      err: err,
      data: {},
    });
  }
};

// Login
// login callback
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Login`,
      err: error,
      data: {},
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = {
  register,
  login,
  authController,
};
