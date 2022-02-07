const express = require("express");
const { Deta } = require("deta");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
dotenv.config({ path: "./.env" });

if (process.env.DETA_RUNTIME === "false") {
  app.use(morgan("dev"));
}

app.get("/", async (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
