const express = require('express');
const {login, logout } = require('../controllers/authController');
const { isLoggedIn } = require('../validation/authValidator');
const { checkAuth } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/check', isLoggedIn, checkAuth);

module.exports = authRouter;
