const router = require("express").Router();
const Joi = require("joi");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticationHandler = require("../controller/authentication-controller");
const authorize = require("../middleware/authorize");
const refreshHandler = require("../controller/refresh-controller");
const registerHandler = require("../controller/register-controller");

// Create new user
router.post("/register", registerHandler);
// Login / authentication
router.post("/auth", authenticationHandler);
// Refresh access token
router.post("/refresh", refreshHandler);
// Logout
router.get("/logout", (req, res) => {
  res.send("logout");
});

router.get("/data", authorize, (req, res) => {
  res.send("Received");
});

module.exports = router;

// {
//   "firstName": "Gaith",
//   "lastName": "M",
//   "password": "123Gaith123",
//   "email": "gaithteraacc@gmail.com"
// }
