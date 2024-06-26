const express = require('express');
const router = express.Router();

// Importing Controller
const messageController = require('../controllers/message.js')

// Importing Middleware
const validator = require('../middlewares/validator.js');

// Importing Validations
const { messageData } = require('../validations/message.js');

// Routes

router.get('/', messageController.index) // Get all messages
router.post('/', validator(messageData), messageController.store) // Send new message


module.exports = router