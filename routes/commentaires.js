const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

// Get all comments
router.get('/', commentController.getAllComments)

// Get an comment by id
router.get('/:id', commentController.getCommentById)

// Add a new comment
router.post('/', commentController.createComment);

// Update an existing comment
router.patch('/:id', commentController.updateComment);  

// Delete an existing comment
router.delete('/:id', commentController.deleteComment)

module.exports = router;