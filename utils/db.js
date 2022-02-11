const { Deta } = require("deta");
const dotenv = require("dotenv");

dotenv.config();

const db = Deta(
  process.env.DETA_RUNTIME === "true" ? null : process.env.PROJECT_KEY
).Base("db");

module.exports = db;
