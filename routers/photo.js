const express = require('express');
const router = express.Router();

const photoController = require('../controllers/photo.js')

// Importing multer for body parsing multipart-form/data
const multer = require('multer');
const upload = multer({ dest: "uploads/posts/" })

router.get('/', photoController.index) // Get all photos
router.get('/:id', photoController.show) // Show details of specific photo based on ID

router.post('/', upload.single('image'), photoController.store) // Upload new photo
router.put('/:id', upload.single('image'), photoController.update) // Edit photo

router.delete('/:id', photoController.destroy) // Delete photo



module.exports = router