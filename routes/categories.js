const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories
router.get('/', async (req, res) => {
    const categories = await prisma.categorie.findMany();
    res.json(categories)
})

// Get an categorie by id
router.get('/:id', async (req, res) => {
    const categorie = await prisma.categorie.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!categorie) {
    return res.status(404).json({ error: 'Category not found' });
    }

    res.json(categorie);
})

// Add a new categorie
router.post('/', async (req, res) => {
    const { nom } = req.body;

    try {
        const categorie = await prisma.categorie.create({
        data: {
            nom,
        },
        });

        res.json(categorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the category' });
    }
})

// Update an existing categorie
router.patch('/:id', async (req, res) => {
    const { nom } = req.body;
    try {
        const updatedCategorie = await prisma.categorie.update({
            where: { id: parseInt(req.params.id) },
            data: {
                nom,
            },
        });
    
        res.json(updatedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the categorie' });
    }
});   

// Delete an existing categorie
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategorie = await prisma.categorie.delete({
            where: { id: parseInt(req.params.id) },
        });
    
        res.json(deletedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the categorie' });
    }
})

module.exports = router;