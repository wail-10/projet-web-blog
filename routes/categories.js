const express = require('express');
const router = express.Router();

// Get all categories
router.get('/', (req, res) => {})

// Get an categorie by id
router.get('/:id', (req, res) => {})

// Add a new categorie
router.post('/', (req, res) => {})

// Update an existing categorie
router.patch('/:id', (req, res) => {})

// Delete an existing categorie
router.delete('/:id', (req, res) => {})

module.exports = router;