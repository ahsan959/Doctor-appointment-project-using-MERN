const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const adminRoute = require("./routes/AdminRoute");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/DoctorAppointment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(4000, () => console.log("Server started on port 4000"));
