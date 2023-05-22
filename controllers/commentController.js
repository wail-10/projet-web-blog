const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllComments = async (req, res) => {
    const comments = await prisma.commentaire.findMany();
    res.json(comments)
}

const getCommentById = async (req, res) => {
    const comment = await prisma.commentaire.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
}

const createComment = async (req, res) => {
    const { email, contenu, articleId } = req.body;

    try {
        await prisma.$transaction(async (prisma) => {
        const commentaire = await prisma.commentaire.create({
            data: {
                email,
                contenu,
                article: { connect: { id: parseInt(articleId) } },
            },
        });
        
        res.json(commentaire);})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the comment' });
    }
}

const updateComment = async (req, res) => {
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
        res.status(500).json({ error: 'An error occurred while updating the comment' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const deletedCommentaire = await prisma.commentaire.delete({
            where: { id: parseInt(req.params.id) },
        });
    
        res.json(deletedCommentaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the comment' });
    }
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}