const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {})

// Get an user by id
router.get('/:id', (req, res) => {})

// Add a new user
router.post('/', (req, res) => {})

// Update an existing user
router.patch('/:id', (req, res) => {})

// Delete an existing user
router.delete('/:id', (req, res) => {})

module.exports = router;
