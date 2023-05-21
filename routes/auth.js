const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

const session = require('express-session');

// Set up session middleware
router.use(
    session({
        secret: 'H$e9P#2gTk@nW$1L!u0',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 3600000,
        },
    })
);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/check-session', authController.checkSession);

module.exports = router