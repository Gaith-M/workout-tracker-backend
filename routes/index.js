const router = require("express").Router();

router.use("/api", require("./auth-routes"));

module.exports = router;
