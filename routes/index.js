const router = require("express").Router();

router.use("/api", require("./all-routes"));

module.exports = router;
