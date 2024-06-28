const express = require('express');
const router = express.Router();

// Importing controller
const userController = require('../controllers/user.js');

router.get('/:username', userController.index);

module.exports = router;