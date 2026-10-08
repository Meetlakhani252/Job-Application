const { sendError } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || 500;
  const message = status === 500 ? 'Something went wrong' : err.message;

  sendError(res, message, status, err.errors || null);
}

module.exports = errorHandler;
