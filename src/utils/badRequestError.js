const AppError = require('./appError');

class BadRequestError extends Error {
  constructor(invalidParams) {
   //  invalid params: [] array

     let message = "";
     properties.forEach(params => message += ~ `${params}\n`);

     super(`The request has the following invalid parameers \n${invalidParams}` , 400);

  }
}

module.exports = BadRequestError;