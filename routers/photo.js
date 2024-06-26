const express = require('express');
const router = express.Router();

// Importing controller
const photoController = require('../controllers/photo.js');

// Importing Middlewares
const authenticate = require('../middlewares/authenticate.js');
const authorization = require('../middlewares/authorization.js');

// Importing multer for body parsing multipart-form/data
const multer = require('multer');
const upload = multer({ dest: "uploads/posts/" });

// Routes
router.get('/', photoController.index) // Get all photos
router.get('/:id', photoController.show) // Show details of specific photo based on ID

// Protected Routes

router.use(authenticate); // Use authenticate middleware

router.post('/', upload.single('image'), photoController.store) // Upload new photo
router.put('/:id', authorization, upload.single('image'), photoController.update) // Edit photo

router.delete('/:id', authorization, photoController.destroy) // Delete photo



module.exports = router