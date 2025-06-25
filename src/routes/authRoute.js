const express = require('express');
const {login, logout } = require('../controllers/authController');


//Resource - User
// /users


//we have to initialise a router object to add routes in a new file
//Routes are used for segregating your routes in different modules

const authRouter = express.Router();

authRouter.post('/login', login); // this is a route registration
authRouter.post('/logout', logout); 


module.exports = authRouter; // exporting the router
