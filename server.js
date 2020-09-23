const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const publicdir = __dirname + "/public";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  if (req.path.indexOf(".") === -1) {
    var file = publicdir + req.path + ".html";
    fs.exists(file, function (exists) {
      if (exists) req.url += ".html";
      next();
    });
  } else next();
});


app.use(express.static(publicdir));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
