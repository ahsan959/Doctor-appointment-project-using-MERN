const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },

  email: {
    type: String,
    required: [true, "email is mandatory"],
  },

  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
