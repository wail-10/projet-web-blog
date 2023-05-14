const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments
router.get('/', async (req, res) => {
    // res.send(comments)
    const comments = await prisma.commentaire.findMany();
    res.json(comments)
})

// Get an comment by id
router.get('/:id', async (req, res) => {
    const comment = await prisma.commentaire.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
})

// Add a new comment
router.post('/', async (req, res) => {
    const { email, contenu, articleId } = req.body;

    try {
        const commentaire = await prisma.commentaire.create({
            data: {
                email,
                contenu,
                article: { connect: { id: articleId } },
            },
        });
        res.json(commentaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the commentaire' });
    }
});

// Update an existing comment
router.patch('/:id', async (req, res) => {
    const { email, contenu } = req.body;

    try {
        const updatedCommentaire = await prisma.commentaire.update({
            where: { id: parseInt(req.params.id) },
            data: {
            ...(email && { email }),
            ...(contenu && { contenu }),
            },
        });
    
        res.json(updatedCommentaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the commentaire' });
    }
});  

// Delete an existing comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedCommentaire = await prisma.commentaire.delete({
            where: { id: parseInt(req.params.id) },
        });
    
        res.json(deletedCommentaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the comment' });
    }
})

module.exports = router;