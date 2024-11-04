// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel');

const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const routes = require('./routes/route.js');
require('./common/validator')
const cors = require('cors');

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

mongoose
 .connect('mongodb://localhost:27017')
 .then(() => {
  console.log('Connected to the Database successfully');
 });

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original file name
  },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ImgBB API Key
const IMGBB_API_KEY = 'a4e3bc5a583059f2a878fdec1d2b1494';

// Function to upload file to AnonFiles
const uploadFileToAnonFiles = async (filePath) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('https://api.anonfiles.com/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Return the file link
    return response.data.data.file.url.full;
  } catch (error) {
    throw new Error('Error uploading file: ' + error.response.data.error.message);
  }
};

// Create an endpoint for file upload
app.post('/upload', upload.single('stlFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const fileLink = await uploadFileToAnonFiles(req.file.path);
    res.send(`File uploaded successfully: ${fileLink}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));

app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});

app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})