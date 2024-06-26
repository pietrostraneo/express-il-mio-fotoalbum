const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.js');

router.get('/', categoryController.index) //Get all categories

router.post('/', categoryController.store) //Create new category

router.delete('/:id', categoryController.destroy) //Delete category by ID



module.exports = router