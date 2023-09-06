const router = require("express").Router();
const { createExercise, getUserExercises, updateExercise, deleteExercise, getExerciseByID } = require("../controller/exercise-controller");

router.post("/create", createExercise);
router.get("/details", getExerciseByID);
router.put('/', updateExercise)
router.delete('/', deleteExercise)
router.get("/", getUserExercises);

module.exports = router;
