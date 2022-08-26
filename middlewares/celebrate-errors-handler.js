const { isCelebrateError } = require('celebrate');
const { BadRequestError } = require('../errors/400_bad-request-error');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const errParams = err.details.get('params');
    if (!errorBody && errParams) {
      throw new BadRequestError(errParams.message);
    }
    throw new BadRequestError(errorBody.message);
  }
  return next(err);
};

module.exports = {
  celebrateErrorHandler,
};
