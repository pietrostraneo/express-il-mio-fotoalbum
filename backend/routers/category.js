const express = require('express');
const router = express.Router();

// Importing controller
const categoryController = require('../controllers/category.js');

// Importing middlewares
const authenticate = require('../middlewares/authenticate.js');
const validator = require('../middlewares/validator.js');

// Importing Validations
const { categoryData } = require('../validations/category.js');

// Routes

router.get('/', categoryController.index) //Get all categories

// Protected Routes

router.use(authenticate); // Use authenticate middleware

router.post('/', validator(categoryData), categoryController.store) //Create new category

router.delete('/:id', categoryController.destroy) //Delete category by ID



module.exports = router