const Admin = require('../models/Admin');
const AppError = require('../utils/AppError');

const verifyAdminCredentials = async (email, password) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
  const isMatch = admin ? await admin.comparePassword(password) : false;

  if (!admin || !isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  return admin._id.toString();
};

const getAdminById = async (adminId) => {
  const admin = await Admin.findById(adminId).select('-password').lean();

  if (!admin) {
    throw new AppError('Admin not found', 404);
  }

  return admin;
};

module.exports = { verifyAdminCredentials, getAdminById };
