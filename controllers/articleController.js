const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllArticles = async (req, res) => {
    const {skip, take} = req.query;
    const articles = await prisma.Article.findMany({
        skip: parseInt(skip) || 0, 
        take: parseInt(take) || 12,
        include:{
            utilisateur: {
                select: {
                    nom: true
                }
            }
        }
    });
    res.json(articles)
}

const getArticleById = async (req, res) => {
    const article = await prisma.article.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { commentaires: true },
    });
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
}

const createArticle = async (req, res) => {
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
}

const updateArticle = async (req, res) => {
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
}

const deleteArticle = async (req, res) => {
    try {
        // Retrieve the article along with its associated commentaires
        const article = await prisma.article.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { commentaires: true },
        });
    
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
    
        // Delete the article
        const deletedArticle = await prisma.article.delete({
            where: { id: article.id },
        });
    
        res.json(deletedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the article' });
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}