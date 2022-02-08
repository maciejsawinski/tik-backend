const { Deta } = require("deta");
const dotenv = require("dotenv");

dotenv.config();

const db = Deta(
  process.env.DETA_RUNTIME !== "true" ? process.env.PROJECT_KEY : null
).Base("db");

module.exports = db;
