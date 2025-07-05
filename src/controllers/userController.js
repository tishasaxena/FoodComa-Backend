const{ model } = require('mongoose');
const { registerUser } = require('../services/userService');
const AppError = require('../utils/appError');

async function createUser(req, res) {
  
    
    try{
        const response = await registerUser(req.body);

        return res.status(201).json({
            message: 'Successfully registered the user',
            success: true,
            data: response,
            error: {}
    
         });

    }catch(error){
          console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
   
}

module.exports ={
    createUser
}

