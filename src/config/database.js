const mongoose = require("mongoose");

const Connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/DoctorAppointment");
  } catch (error) {
    console.log(`we are not able to Connect the database ${error}`.bgRed.white);
  }
};

module.exports = Connect;
