const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { nom, email, password } = req.body;
    
    const user = await prisma.utilisateur.findUnique({
        where: { email: email },
    });
    if (user) {
        return res.status(404).json({ error: 'User already exist' });
    }

    const role = "AUTHOR";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await prisma.utilisateur.create({
            data: {
                nom,
                email,
                password: hashedPassword,
                role,
            },
        });

        const token = jwt.sign({id: user.id}, config.get('jwtPrivateKey'));

        res.header('x-auth-token', token).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while register' });
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await prisma.utilisateur.findUnique({
            where: { email: email},
            select: {
                id: true,
                email: true,
                password: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({id: user.id}, config.get('jwtPrivateKey'));
        const {password: _, ...other} = user;
        // res.cookie('access_token', token, {httpOnly: true}).status(200).json()
        res.send(other);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite: true,
        secure: true
    }).status(200).json("User has been logged out");
};

module.exports = {
    register,
    login,
    logout
}