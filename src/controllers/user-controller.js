const bcrypt = require("bcrypt");
const User = require("../models/userModel");

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
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "user not Found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "invalid email Id and password",
      });
    }
  } catch (error) {
    console.log("Something went wrong in controller layer");
    throw { error };
  }
};
module.exports = {
  register,
};
