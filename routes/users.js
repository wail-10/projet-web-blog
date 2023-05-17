const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Get all users
router.get('/', userController.getAllUsers)

// Get an user by id
router.get('/:id', userController.getUserById)

// Add a new user
router.post('/', userController.createUser)

// Update an existing user
router.patch('/:id', userController.updateUser);


// Delete an existing user
router.delete('/:id', userController.deleteUser);

module.exports = router;
