const { Router } = require('express');
const { supabase } = require('../config/db');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/response');

const router = Router();

// POST /api/auth/signup
// Creates user with email_confirm: true via service role to bypass email rate limits
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, fullName, phone } = req.body;

    if (!email || !password || !fullName || !phone) {
      throw new AppError('Full name, phone, email, and password are required', 400);
    }

    if (String(password).length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName.trim(),
        phone: phone.trim(),
      },
    });

    if (error) {
      // Return user-friendly error messages
      if (error.message?.toLowerCase().includes('already') || error.code === 'email_exists') {
        throw new AppError('An account with this email already exists', 409);
      }
      throw new AppError(error.message, 400);
    }

    sendSuccess(
      res,
      { user: { id: data.user.id, email: data.user.email } },
      'Account created successfully',
      201
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;

