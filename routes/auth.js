const router = require("express").Router();
const db = require("../utils/db");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) return res.status(400).send("Bad request");

  const dbCredentials = await db.get("auth");
  const passwordCompare = await bcrypt.compare(
    password,
    dbCredentials.value.password
  );

  if (login !== dbCredentials.value.login || !passwordCompare) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    return res.status(200).json({ message: "Login successful" });
  }
});

module.exports = router;
