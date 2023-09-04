const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  progression: [
    {
      date: { type: Date, default: Date.now },
      sets: [
        {
          reps: { type: Number, required: true },
          weight: { type: Number, required: true },
        },
      ],
    },
  ],
});

const Exercise = model("Exercise", ExerciseSchema);

module.exports = Exercise;
