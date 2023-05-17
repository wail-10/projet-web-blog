const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController')


// Get all categories
router.get('/', categorieController.getAllCategories)

// Get an categorie by id
router.get('/:id', categorieController.getCategoryById)

// Add a new categorie
router.post('/', categorieController.createCategory)

// Update an existing categorie
router.patch('/:id', categorieController.updateCategory);   

// Delete an existing categorie
router.delete('/:id', categorieController.deleteCategory)

module.exports = router;