

const AppError = require('./appError');

class BadRequestError extends AppError {
  constructor(invalidParams) {
    // invalidParams is expected to be an array of strings
    const message = `The request has the following invalid parameters:\n` + 
                    invalidParams.map(param => `- ${param}`).join('\n');

    super(message, 400);  // 400 is the HTTP status code for Bad Request
  }
}

module.exports = BadRequestError;
