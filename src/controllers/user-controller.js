const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const DoctorModel = require("../models/doctor-models");

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

const applyDoctor = async (req, res) => {
  try {
    const newDoctor = await DoctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    // then admin ko bata do new request i ha
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply request as doctor",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.firstName,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.status(200).json({
      success: true,
      message: "Doctor account Applied Succesfull",
      data: newDoctor,
      err: {},
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Error occure while applying Doctor",
      err: error,
    });
  }
};

const getAllNotification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seenNotication = user.seenNotication;
    const notification = user.notification;
    seenNotication.push(...notification);
    user.seenNotication = [];
    user.seenNotication = notification;

    const Updateduser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: Updateduser,
    });
  } catch (error) {
    console.log("Something went wrong ", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching a notification",
      err: error,
      data: {},
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      success: true,
      message: "Successfull get all the Users",
      data: allUsers,
      err: {},
    });
  } catch (error) {
    console.log("something went wrong ");
    throw { error };

    res.status(500).json({
      success: false,
      message: "we are not able to get all the Users",
      data: {},
      err: error,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const allDoctor = await DoctorModel.find({});
    res.status(200).json({
      success: true,
      message: "Successfull get all the Users",
      data: allDoctor,
      err: {},
    });
  } catch (error) {
    console.log("something went wrong ");
    throw { error };

    res.status(500).json({
      success: false,
      message: "we are not able to get all the Users",
      data: {},
      err: error,
    });
  }
};
const deleteAllNotification = async (req, res) => {
  try {
    const response = await User.findOne({ _id: req.body.userId });
    response.notification = [];
    response.seenNotication = [];

    const UpdatedUser = response.save();

    UpdatedUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "Successfully fetch the data",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("something went wrong");
    throw { error };

    res.status(500).json({
      success: false,
      message: "we are enable to delete a City ",
      data: {},
      err: error,
    });
  }
};

const changeAccountStatus = async () => {
  try {
  } catch (error) {
    console.log("something went wrong");
    throw { error };
  }
};
module.exports = {
  register,
  login,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
  getAllUsers,
  getAllDoctor,
  changeAccountStatus,
};
