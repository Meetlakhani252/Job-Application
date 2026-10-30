const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');

const verifyAdminCredentials = async (email, password) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .single();

  if (error || !admin) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  return admin.id;
};

const getAdminById = async (adminId) => {
  const { data: admin, error } = await supabase
    .from('admins')
    .select('id, email, created_at')
    .eq('id', adminId)
    .single();

  if (error || !admin) {
    throw new AppError('Admin not found', 404);
  }

  return admin;
};

module.exports = { verifyAdminCredentials, getAdminById };
