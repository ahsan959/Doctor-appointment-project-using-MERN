const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please provide email"],
    },
    specilization: {
      type: String,
      required: [true, "Please provide specilization"],
    },
    experience: {
      type: String,
      required: [true, "Please provide experience"],
    },
    feesPerCansaltion: {
      type: Number,
      required: [true, "Please provide experience"],
    },
    status: {
      type: String,
      defualt: "pending",
    },
    timing: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  { timestamps: true }
);

const DoctorModel = mongoose.model("doctors", doctorSchema);
module.exports = DoctorModel;
