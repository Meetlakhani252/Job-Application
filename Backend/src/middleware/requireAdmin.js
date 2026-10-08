const { sendError } = require('../utils/response');

const requireAdmin = (req, res, next) => {
  if (!req.session?.adminId) {
    return sendError(res, 'Unauthorized', 401);
  }
  next();
};

module.exports = requireAdmin;
