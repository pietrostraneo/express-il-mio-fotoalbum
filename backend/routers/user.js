const express = require('express');
const router = express.Router();

// Importing controller
const userController = require('../controllers/user.js');

router.get('/:id', userController.index);

module.exports = router;