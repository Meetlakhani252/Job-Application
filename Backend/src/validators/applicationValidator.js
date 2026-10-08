const validator = require('validator');
const AppError = require('../utils/AppError');

// E.164-ish: optional leading +, then 7–15 digits
const PHONE_RE = /^\+?\d{7,15}$/;

const validateApplicationBody = (body) => {
  const { name, phone, email, opportunityId } = body;
  const errors = [];

  if (!name || !String(name).trim()) {
    errors.push('Name is required');
  }

  if (!phone || !String(phone).trim()) {
    errors.push('Phone is required');
  } else if (!PHONE_RE.test(String(phone).trim())) {
    errors.push('Phone must be 7–15 digits, with an optional leading +');
  }

  if (!email || !String(email).trim()) {
    errors.push('Email is required');
  } else if (!validator.isEmail(String(email).trim())) {
    errors.push('Invalid email address');
  }

  if (!opportunityId || !String(opportunityId).trim()) {
    errors.push('opportunityId is required');
  } else if (!/^[a-f\d]{24}$/i.test(String(opportunityId).trim())) {
    errors.push('Invalid opportunityId format');
  }

  if (errors.length > 0) {
    const err = new AppError('Validation failed', 422);
    err.errors = errors;
    throw err;
  }
};

module.exports = validateApplicationBody;
