const express = require('express');
const router = express.Router();

// Get all comments
router.get('/', (req, res) => {})

// Get an comment by id
router.get('/:id', (req, res) => {})

// Add a new comment
router.post('/', (req, res) => {})

// Update an existing comment
router.patch('/:id', (req, res) => {})

// Delete an existing comment
router.delete('/:id', (req, res) => {})

module.exports = router;