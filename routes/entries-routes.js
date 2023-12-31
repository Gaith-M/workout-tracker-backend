const router = require("express").Router();
const Joi = require("joi");
const Exercise = require("../model/Exercise");

const entrySchema = Joi.object({
  sets: Joi.array()
    .items(
      Joi.object({
        reps: Joi.number().min(1).required(),
        weight: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

router.put("/create", async (req, res) => {

  const id = req.query.id;
  if (!id || typeof id !== 'string') return res.status(400).json("ID is required");

  const { error } = entrySchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, data: null, message: error });

  try{
    
    await Exercise.updateOne({ _id: id }, { $push: { progression: req.body } });
    const exercise = await Exercise.findOne({_id: id}, 'progression');

    res.json(exercise)

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
