const Exercise = require("../model/Exercise");
const User = require("../model/User");
const Joi = require("joi");
const Response_Object = require("../utils/response-service");

const createExerciseSchema = new Joi.object({
  name: Joi.string().required(),
});

const updateExerciseName = new Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});

const deleteExerciseSchema = new Joi.object({
  id: Joi.string().required(),
});

const getExerciseByIDSchema = new Joi.object({
  id: Joi.string().required(),
});

const createExercise = async (req, res) => {
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
};

const getUserExercises = async (req, res) => {
  const id = req.query.id;
  if (!id || typeof id !== "string") return res.status(400).json(new Response_Object(false, null, "ID is required"));

  try {
    const exercises = await Exercise.find({ user: id });
    res.json(new Response_Object(true, exercises));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const updateExercise = async (req, res) => {
  const { error } = updateExerciseName.validate(req.body);

  if (error) return res.status(400).json(new Response_Object(false, null, error.details[0].message));

  try {
    const updated = await Exercise.updateOne({ _id: req.body.id }, { $set: { name: req.body.name } });
    res.json(new Response_Object(true, updated));
  } catch (err) {
    res.json(new Response_Object(false, null, err));
  }
};

const deleteExercise = async (req, res) => {
  const { error } = deleteExerciseSchema.validate(req.body);

  if (error) return res.status(400).json(new Response_Object(false, null, error.details[0].message));

  try {
    const deleted = await Exercise.deleteOne({ _id: req.body.id });
    res.json(new Response_Object(true, deleted));
  } catch (err) {
    res.json(new Response_Object(false, null, err));
  }
};

const getExerciseByID = async (req, res) => {
    const { error } = getExerciseByIDSchema.validate(req.body);
  
    if (error) return res.status(400).json(new Response_Object(false, null, error.details[0].message));
  
    try {
      const exercise = await Exercise.findOne({ _id: req.body.id });
      res.json(new Response_Object(true, exercise));
    } catch (err) {
      res.json(new Response_Object(false, null, err));
    }
  };

module.exports = {
  createExercise,
  getUserExercises,
  updateExercise,
  deleteExercise,
  getExerciseByID
};
