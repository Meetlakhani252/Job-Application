const session = require('express-session');
const env = require('./env');

const isProduction = process.env.NODE_ENV === 'production';

const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // Using MemoryStore for simplicity as requested.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  },
});

module.exports = { sessionMiddleware };

