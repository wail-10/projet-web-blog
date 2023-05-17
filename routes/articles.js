const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')

// Get all articles
router.get('/', articleController.getAllArticles)

// Get an article by id
router.get('/:id', articleController.getArticleById)

// Add a new article
router.post('/', articleController.createArticle);

// Update an existing article
router.patch('/:id', articleController.updateArticle);

// Delete an existing article
router.delete('/:id', articleController.deleteArticle);  

module.exports = router;
