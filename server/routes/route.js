// server/routes/route.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const  enquiryController  = require('../controllers/enquiryController');
const setupController = require('../controllers/setupController');
router.use('/images', express.static('D:/images'));
const {getLocalIPv4} = require('../controllers/getLocalIPv4Controller')
const ImageKit = require('imagekit');

router.get('/clove', (req,res) =>{
    return res.json({"User":"Clove Dental"});
});

// // Route to get all images in the D:/images folder
// router.get('/all-images', (req, res) => {
//     const directoryPath = 'D:/images';

//     // Read all files in the directory
//     fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//             return res.status(500).send('Unable to scan directory');
//         }

//         // Filter out only image files (e.g., jpg, png, etc.)
//         const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

//         // Generate links to access these images
//         const imageLinks = imageFiles.map(file => {
//             return {
//                 name: file,
//                 url: `http://localhost:3000/images/${file}`
//             };
//         });

//         // Respond with the list of image links
//         res.json(imageLinks);
//     });
// });

const imagekit = new ImageKit({
    publicKey: "public_eokTbYFDc0D1s0TP37EZryE3sqA=",
    privateKey: "private_KdIwMD/a/uYX7fazceZlPxz0VVA=",
    urlEndpoint: "https://ik.imagekit.io/60ylfik0n"
});


router.get('/auth', (req, res) => {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);
});

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


router.get('/local-ip', (req, res) => {
    const localIP = getLocalIPv4();
    if (localIP) {
        res.json({ ip: localIP });
    } else {
        res.status(500).json({ error: 'Unable to retrieve local IP' });
    }
});

router.post('/signup', userController.signup);

router.post('/setup', setupController.setup);

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.post('/category', userController.allowIfLoggedin,categoryController.category);

router.post('/enquiry',enquiryController.enquiry);

module.exports = router;