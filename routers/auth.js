const express = require('express');
const router = express.Router();

// Importing Controller
const authController = require('../controllers/auth.js');

// Importing multer for body parsing multipart-form/data
const multer = require('multer');
const upload = multer({ dest: "uploads/user/" });

// Importing Middleware
const validator = require('../middlewares/validator.js');

// Importing Validations
const { registerData, loginData } = require('../validations/auth.js');

// Routes

router.post('/sign-up', upload.single('image'), validator(registerData), authController.register) // Create new user
router.post('/login', validator(loginData), authController.login) // Generate token and login

module.exports = router