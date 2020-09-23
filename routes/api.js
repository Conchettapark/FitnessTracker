const router = require("express").Router();
let db = require("../models");



router.get("/api/workouts",(req, res) => {
   db.Workout.find().then(function (docs) {
    res.json(docs);
  }).catch(function (err){
    console.log("ERR: ", err);
    res.json(err);
  })
});

router.put("/api/workouts/:workoutId", ({ params, body }, res) => {
  const workout = db.Workout.findByIdAndUpdate(params.workoutId, {
    $push: { exercises: body },
  });
});

router.post("/api/workouts", ({ body }, res) => {
  const workout = new db.Workout();
  workout.day = new Date();
  workout.exercises = [body];
  workout.save(function (err) {
    console.log(err);
  });
});

router.get("/api/workouts/range", ({ params, body }, res) => {
  db.Workout.find(
    { day: { $gte: params.startDate, $lte: params.endDate } },
    function (err, docs) {
      return docs;
    }
  );
});

module.exports = router;
