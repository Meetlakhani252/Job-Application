const mongoose = require('mongoose');
const { sendError } = require('../utils/response');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return sendError(res, 'Invalid ID format', 400);
  }
  next();
};

module.exports = validateObjectId;
