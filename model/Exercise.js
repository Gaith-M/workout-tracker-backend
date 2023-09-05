const { Schema, model, Types } = require("mongoose");

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  progression: [
    {
      _id: { type: Types.ObjectId, default: new Types.ObjectId() },
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
