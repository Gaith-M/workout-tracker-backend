const router = require("express").Router();
const Joi = require("joi");
const Exercise = require("../model/Exercise");

const createExerciseSchema = new Joi.object({
  name: Joi.string().required(),
});

router.post("/create", async (req, res) => {
  const { error } = createExerciseSchema.validate(req.body);

  if (error) return res.status(400).json({ success: false, data: null, message: error.details[0].message });

  try{
    const newExercise = await Exercise.create({
      user: req.user.id,
      name: req.body.name
    });

    res.status(201).json({ success: true, message: "Exercise created", data: newExercise });
  }catch(err){
    console.log(err)
  }
  
});

module.exports = router;
