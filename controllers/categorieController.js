const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
    // const categories = await prisma.categorie.findMany();
    const categoriesWithCount = await prisma.categorie.findMany({
        include: {
            articles: true,
        },
    });

    const categories = categoriesWithCount.map((category) => ({
        id: category.id,
        nom: category.nom,
        articleCount: category.articles.length,
    }));
    res.json(categories)
}

const getCategoryById = async (req, res) => {
    const categorie = await prisma.categorie.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { articles: true}
    });
    if (!categorie) {
        return res.status(404).json({ error: 'Category not found' });
    }

    res.json(categorie);
    // const categoryId = parseInt(req.params.id);

    // try {
    // const articles = await prisma.article.findMany({
    //     where: {
    //         categories: {
    //             some: {
    //             id: categoryId,
    //             },
    //         },
    //     },
    //     include: {
    //         categories: true,
    //     },
    // });

    // res.json(articles);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'An error occurred while retrieving articles' });
    // }
}

const createCategory = async (req, res) => {
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
}

const updateCategory = async (req, res) => {
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
}

const deleteCategory = async (req, res) => {
    try {
        const deletedCategorie = await prisma.categorie.delete({
            where: { id: parseInt(req.params.id) },
        });
    
        res.json(deletedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the categorie' });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}