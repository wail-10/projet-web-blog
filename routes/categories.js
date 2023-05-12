const express = require('express');
const router = express.Router();

const categories = [
    {id: 1, title: 'cat 1'},
    {id: 2, title: 'cat 2'},
    {id: 3, title: 'cat 3'},
    {id: 4, title: 'cat 4'}
]

// Get all categories
router.get('/', (req, res) => {
    res.send(categories)
})

// Get an categorie by id
router.get('/:id', (req, res) => {
    const categorie = categories.find( cat => cat.id === parseInt(req.params.id))
    if (!categorie) return res.status(404).send('Categorie not found')

    res.send(categorie)
})

// Add a new categorie
router.post('/', (req, res) => {
    const categorie = {
        id: categories.length + 1,
        title: req.body.title
    }
    categories.push(categorie)
    res.send(categorie)
})

// Update an existing categorie
router.patch('/:id', (req, res) => {
    const categorie = categories.find( cat => cat.id === parseInt(req.params.id))
    if (!categorie) return res.status(404).send('Article not found')
    
    if(req.body.title){
        categorie.title = req.body.title;
    }

    res.send(categorie);
})

// Delete an existing categorie
router.delete('/:id', (req, res) => {
    const categorie = categories.find( a => a.id === parseInt(req.params.id))
    if (!categorie) return res.status(404).send('Course not found')

    const item = categories.indexOf(categorie)
    categories.splice(item, 1)
    res.send(categorie)
})

module.exports = router;