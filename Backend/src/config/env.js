require('dotenv').config();

const env = {
  PORT: process.env.PORT || 5000,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

module.exports = env;
