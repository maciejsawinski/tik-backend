const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// local logging
if (process.env.DETA_RUNTIME !== "true") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// routes
const authRouter = require("./routes/auth");
const kioskRouter = require("./routes/kiosk");

// middlewares
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/kiosk", kioskRouter);

// local server
if (process.env.DETA_RUNTIME !== "true") {
  const port = 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}

module.exports = app;
