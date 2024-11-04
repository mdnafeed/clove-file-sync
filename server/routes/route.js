// server/routes/route.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use('/images', express.static('D:/images'));

// Route to get all images in the D:/images folder
router.get('/all-images', (req, res) => {
    const directoryPath = 'D:/images';

    // Read all files in the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }

        // Filter out only image files (e.g., jpg, png, etc.)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|stl|bmp)$/i.test(file));

        // Generate links to access these images
        const imageLinks = imageFiles.map(file => {
            return {
                name: file,
                url: `http://localhost:8080/images/${file}` // Local file URL
            };
        });

        // Respond with the list of image links
        res.json(imageLinks);
    });
});

module.exports = router;