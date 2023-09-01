const router = require("express").Router();
const User = require("../model/User");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(32).required().messages({
    "string.pattern.base": "Password can contain letters and numbers only",
  }),
  DoB: Joi.date().options({ convert: false }).messages({
    "date.base": "Date of birth must be a valid date",
  }),
  trainingSince: Joi.date().options({ convert: false }).messages({
    "date.base": "Training since must be a valid date",
  }),
  sex: Joi.string(),
});

router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Check if the email is unique
    const match = await User.findOne({ email: req.body.email }).exec();

    if (match) {
      return res.status(409).json({
        success: false,
        message: "Email address is taken",
      });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashed,
    });

    res.status(201).json({ success: true, message: "User created", data: newUser });
  } catch (err) {
    console.log(err);
  }
});

router.post("/auth", (req, res) => {
  res.send("auth");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;


// {
//   "firstName": "Gaith",
//   "lastName": "M",
//   "password": "1231asdas",
//   "email": "gaithteraacc@gmail.com"
// }