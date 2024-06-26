const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

// Importing multer for body parsing multipart-form/data
const multer = require('multer');
const upload = multer({ dest: "uploads/posts/" });

router.post('/sign-up', upload.single('image', authController.register)) // Create new user

router.post('/login', authController.login) // Generate token and login

module.exports = router