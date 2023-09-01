require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// App setup
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // parse the json data sent in the body of the req. it creates the req body and populate it with data sent in the body of the req


// Top level endpoint
app.use(require('./routes'))


// handle 404
app.all('/*', (req, res) => {
  res.status(404).json('404.')
})

app.use((err, req, res, next) => {
  console.log('ERROR')
  console.log(err.message)
  console.log(err.stack)
  res.status(500).send('ERROR')
})


module.exports = app;
