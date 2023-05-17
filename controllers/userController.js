const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.utilisateur.findMany();
    res.json(users)
}

const getUserById = async (req, res) => {
    const user = await prisma.utilisateur.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
}

const createUser = async (req, res) => {
    const { nom, email, password, role } = req.body;
    try {
        const user = await prisma.utilisateur.create({
            data: {
                nom,
                email,
                password,
                role,
            },
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}

const updateUser = async (req, res) => {
    const { email, nom, password, role } = req.body;

    try {
        const updatedUser = await prisma.utilisateur.update({
            where: { id: parseInt(req.params.id) },
            data: {
                ...(email && { email }), 
                ...(nom && { nom }), 
                ...(password && { password }), 
                ...(role && { role }),
            },
            select: {
                id: true,
                nom: true,
                email: true,
                password: true,
                role: true,
                articles: true,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Retrieve the user along with their associated articles
        const utilisateur = await prisma.utilisateur.findUnique({
            where: { id: parseInt(id) },
            include: { articles: true },
        });
    
        if (!utilisateur) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        const deletedUtilisateur = await prisma.utilisateur.delete({
            where: { id: utilisateur.id },
        });
    
        res.json(deletedUtilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}