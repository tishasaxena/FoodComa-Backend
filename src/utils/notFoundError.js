const AppError = require('./appError');

class NotFoundError extends Error {
  constructor( resource) {
   //  properties: [] array

    


     super(`Not able to find ${resource}` , 404);

  }
}

module.exports = NotFoundError;