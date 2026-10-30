const { supabase } = require('../config/db');
const { sendError } = require('../utils/response');
const AppError = require('../utils/AppError');

const requireUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token required', 401);
  }

  const token = authHeader.split(' ')[1];

  // Verify the JWT token with Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return sendError(res, 'Invalid or expired token', 401);
  }

  // Attach the user object to the request for use in controllers
  req.user = user;
  next();
};

module.exports = requireUser;
