const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all articles
router.get('/', async (req, res) => {
    const articles = await prisma.Article.findMany();
    res.json(articles)
})

// Get an article by id
router.get('/:id', async (req, res) => {
    const article = await prisma.article.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!article) {
    return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
})

// Add a new article
router.post('/', async (req, res) => {
    const { titre, contenu, image, published, utilisateurId, categorieIds } = req.body;

    try {
        const article = await prisma.article.create({
            data: {
                titre,
                contenu,
                image,
                published,
                utilisateur: { connect: { id: utilisateurId } },
                categories: { connect: categorieIds.map((categoryId) => ({ id: categoryId })) },
            },
        });
    
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the article' });
    }
});

// Update an existing article
router.patch('/:id', async (req, res) => {
    const { titre, contenu, image, published } = req.body;

    try {
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(req.params.id) },
            data: {
                ...(titre && { titre }),
                ...(contenu && { contenu }),
                ...(image && { image }),
                ...(published !== undefined && { published }),
            },
        });
    
        res.json(updatedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the article' });
    }
});

// Delete an existing article
router.delete('/:id', async (req, res) => {
    try {
        // Retrieve the article along with its associated commentaires
        const article = await prisma.article.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { commentaires: true },
        });
    
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
    
        // Delete the associated commentaires
        const deletedCommentaires = await prisma.commentaire.deleteMany({
            where: { articleId: article.id },
        });
    
        // Delete the article
        const deletedArticle = await prisma.article.delete({
            where: { id: article.id },
        });
    
        res.json({ deletedArticle, deletedCommentaires });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the article' });
    }
});  

module.exports = router;
