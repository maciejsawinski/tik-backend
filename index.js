const express = require("express");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const kioskRouter = require("./routes/kiosk");
const configRouter = require("./routes/config");
const update = require("./cron/update");

let app = express();
dotenv.config();

// on deta micro
if (process.env.DETA_RUNTIME === "true") {
  const { App } = require("deta");
  app = App(express());

  app.lib.cron(async (event) => {
    await update();

    return event;
  });

  // on local
} else {
  const morgan = require("morgan");
  app.use(morgan("dev"));

  app.get("/crontest", async (req, res) => {
    await update();

    res.status(200).send("cron test");
  });

  const port = 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}

// middlewares
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/config", configRouter);
app.use("/api/kiosk", kioskRouter);

module.exports = app;
