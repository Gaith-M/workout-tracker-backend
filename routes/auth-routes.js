const router = require("express").Router();
const Joi = require("joi");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
});

router.post("/register", require("../controller/register-controller"));

// for auth we need : email and password.
router.post("/auth", async (req, res) => {
  const { error } = authSchema.validate(req.body);

  if (error) return res.status(400).json({ success: false, message: error.details[0].message, data: null });

  try {
    const foundUser = await User.findOne({ email: req.body.email }).exec();
    if (!foundUser) return res.status(400).json({ success: false, message: `Please, re-check the provided data.` });

    // compare passwords
    const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
    if (!validPassword) return res.status(400).json({ success: false, message: `Please, re-check the provided data.` });

    // create token and refresh token
    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        id: foundUser._id,
      },
      process.env.AUTH_TOKEN_SECRET,
      {
        expiresIn: "300s",
      }
    );

    const refreshToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        id: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "300s",
      }
    );

    foundUser.accessToken = accessToken;
    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();

    res.json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;

// {
//   "firstName": "Gaith",
//   "lastName": "M",
//   "password": "123Gaith123",
//   "email": "gaithteraacc@gmail.com"
// }
