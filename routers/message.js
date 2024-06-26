const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.js')


router.get('/', messageController.index) // Get all messages

router.post('/', messageController.store) // Send new message



module.exports = router