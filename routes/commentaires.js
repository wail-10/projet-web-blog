const express = require('express');
const router = express.Router();
const comments = [
    {id: 1, description: 'this is a comment'},
    {id: 2, description: 'this is a comment'},
    {id: 3, description: 'this is a comment'}
]

// Get all comments
router.get('/', (req, res) => {
    res.send(comments)
})

// Get an comment by id
router.get('/:id', (req, res) => {
    const comment = comments.find( com => com.id === parseInt(req.params.id))
    if (!comment) return res.status(404).send('Article not found')

    res.send(comment)
})

// Add a new comment
router.post('/', (req, res) => {
    const comment = {
        id: comments.length + 1,
        description: req.body.description
    }
    comments.push(comment)
    res.send(comment)
})

// Update an existing comment
router.patch('/:id', (req, res) => {
    const comment = comments.find( com => com.id === parseInt(req.params.id))
    if (!comment) return res.status(404).send('Article not found')
    
    if(req.body.description){
        comment.description = req.body.description;
    }

    res.send(comment);
})

// Delete an existing comment
router.delete('/:id', (req, res) => {
    const comment = comments.find( a => a.id === parseInt(req.params.id))
    if (!comment) return res.status(404).send('Course not found')

    const item = comments.indexOf(comment)
    comments.splice(item, 1)
    res.send(comment)
})

module.exports = router;