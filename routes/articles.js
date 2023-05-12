const express = require('express');
const router = express.Router();

const articles = [
    {id: 1, titre: 'article 1', contenu: 'this is article 1'},
    {id: 2, titre: 'article 2', contenu: 'this is article 2'},
    {id: 3, titre: 'article 3', contenu: 'this is article 3'},
    {id: 4, titre: 'article 4', contenu: 'this is article 4'}
]
// Get all articles
router.get('/', (req, res) => {
    res.send(articles)
})

// Get an article by id
router.get('/:id', (req, res) => {
    const article = articles.find( a => a.id === parseInt(req.params.id))
    if (!article) return res.status(404).send('Article not found')

    res.send(article)
})

// Add a new article
router.post('/', (req, res) => {
    const article = {
        id: articles.length + 1,
        titre: req.body.titre,
        contenu: req.body.contenu
    }
    articles.push(article)
    res.send(article)
})

// Update an existing article
router.patch('/:id', (req, res) => {
    const article = articles.find( a => a.id === parseInt(req.params.id))
    if (!article) return res.status(404).send('Article not found')
    
    if(req.body.titre){
        article.titre = req.body.titre;
    }

    if(req.body.contenu){
        article.contenu = req.body.contenu;
    }
    res.send(article);
})

// Delete an existing article
router.delete('/:id', (req, res) => {
    const article = articles.find( a => a.id === parseInt(req.params.id))
    if (!article) return res.status(404).send('Course not found')

    const item = articles.indexOf(article)
    articles.splice(item, 1)
    res.send(article)
})

module.exports = router;
