const express = require('express');
const router = express.Router();

// Importing controller
const photoController = require('../controllers/photo.js');

// Importing Middlewares
const authenticate = require('../middlewares/authenticate.js');
const authorization = require('../middlewares/authorization.js');
const validator = require('../middlewares/validator.js');

// Importing Validations
const { createPhoto, editPhoto } = require('../validations/photo.js');

// Importing multer for body parsing multipart-form/data
const multer = require('multer');
const upload = multer({ dest: "uploads/photos/" });

// Routes
router.get('/', photoController.index) // Get all photos
router.get('/:id', photoController.show) // Show details of specific photo based on ID

// Protected Routes

router.use(authenticate); // Use authenticate middleware

router.post('/', upload.single('image'), validator(createPhoto), photoController.store) // Upload new photo
router.put('/:id', authorization, upload.single('image'), validator(editPhoto), photoController.update) // Edit photo

router.delete('/:id', authorization, photoController.destroy) // Delete photo



module.exports = router