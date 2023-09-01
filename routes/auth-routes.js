const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("register");
});

router.post("/auth", (req, res) => {
  res.send("auth");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
