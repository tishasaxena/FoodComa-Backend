const AppError = require('./appError');

class InternalServerError extends AppError {
  constructor() {
   //  properties: [] array

    

     super(`It's not you it's our server where something went wrong` , 500);

  }
}

module.exports = InternalServerError;