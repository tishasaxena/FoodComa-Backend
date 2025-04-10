const express = require('express');
const {login } = require('../controllers/authController');


//Resource - User
// /users


//we have to initialise a router object to add routes in a new file
//Routes are used for segregating your routes in different modules

const authRouter = express.Router();

authRouter.post('/login', login); // this is a route registration


module.exports = authRouter; // exporting the router
