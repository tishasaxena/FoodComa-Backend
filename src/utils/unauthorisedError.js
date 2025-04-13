const AppError = require('./appError');

class UnAuthorisedError extends Error {
  constructor( resource) {
   //  properties: [] array

    


     super(`User is not authorised properly` , 401);

  }
}

module.exports = UnAuthorisedError;