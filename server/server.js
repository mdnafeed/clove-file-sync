// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/route.js');

const app = express();

require("dotenv").config({
  path: path.join(__dirname, "../.env")
});


app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));


app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})