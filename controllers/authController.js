const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkSession = (req, res, next) => {
    if (req.session) {
        // Session is started
        next();
    } else {
        // Session is not started
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const register = async (req, res) => {
    const { nom, email, password } = req.body;

    const user = await prisma.utilisateur.findUnique({
        where: { email: email },
    });
    if (user) {
        return res.status(404).json({ error: 'User already exist' });
    }

    const role = "AUTHOR";
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
        res.status(500).json({ error: 'An error occurred while register' });
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await prisma.utilisateur.findUnique({
            where: { email: email},
            select: {
                email: true,
                password: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (user.password !== password){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // console.log(req.session.user)
        // req.session.user = user;
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}

module.exports = {
    register,
    login,
    checkSession
}