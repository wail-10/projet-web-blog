const express = require('express');
const router = express.Router();

// Get all articles
router.get('/', (req, res) => {})

// Get an article by id
router.get('/:id', (req, res) => {})

// Add a new article
router.post('/', (req, res) => {})

// Update an existing article
router.patch('/:id', (req, res) => {})

// Delete an existing article
router.delete('/:id', (req, res) => {})

module.exports = router;