const router = require("express").Router();
const Joi = require("joi");
const Exercise = require("../model/Exercise");
const User = require("../model/User");

const createExerciseSchema = new Joi.object({
  name: Joi.string().required(),
});

router.post("/create", async (req, res) => {
  const { error } = createExerciseSchema.validate(req.body);

  if (error) return res.status(400).json({ success: false, data: null, message: error.details[0].message });

  try {
    const newExercise = await Exercise.create({
      user: req.user.id,
      name: req.body.name,
    });

    res.status(201).json({ success: true, message: "Exercise created", data: newExercise });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id || typeof id !== "string") return res.status(400).json("ID required");

  try {
    const exercises = await Exercise.find({ user: id });
    res.json({ exercises });

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
