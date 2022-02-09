const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const db = require("../utils/db");

router.get("/", async (req, res) => {
  const kiosk = await db.get("kiosk");
  res.json(kiosk.value);
});

// protected route
router.get("/test", verifyToken, async (req, res) => {
  const kiosk = await db.get("kiosk");
  res.json({ user: req.user, kiosk: kiosk.value });
});

module.exports = router;
