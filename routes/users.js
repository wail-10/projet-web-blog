const express = require('express');
const router = express.Router();
const users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Alice'},
  {id: 3, name: 'Paul'}
]
// Get all users
router.get('/', (req, res) => {
  res.send(users)
})

// Get an user by id
router.get('/:id', (req, res) => {
  const user = users.find( u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('User not found')

  res.send(user)
})

// Add a new user
router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  }
  users.push(user)
  res.send(user)
})

// Update an existing user
router.patch('/:id', (req, res) => {
  const user = users.find( u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('Article not found')
    
    if(req.body.name){
        user.name = req.body.name;
    }

    res.send(user);
})

// Delete an existing user
router.delete('/:id', (req, res) => {
  const user = users.find( a => a.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('Course not found')

  const item = users.indexOf(user)
  users.splice(item, 1)
  res.send(user)
})

module.exports = router;
