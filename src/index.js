const express = require("express");

const color = require("colors");

const morgan = require("morgan");
var bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const Connect = require("./config/database");
const userRoute = require("./routes/userRoute");

const setupAndStartServer = () => {
  // rest Object

  const app = express();

  //middlewares
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan("dev"));

  //   routes
  app.use("/api/v1/user", userRoute);

  app.listen(PORT, async () => {
    console.log(`Server Running on :${PORT}`.bgBlue.white);
    await Connect();
    console.log("database Connected".bgGreen.white);
  });
};

setupAndStartServer();
