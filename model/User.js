const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  DoB: Number,
  sex: String,
  trainingSince: Date,
  accessToken: String,
  refreshToken: String,
  //   routines:
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
