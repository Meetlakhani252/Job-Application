const session = require('express-session');
const env = require('./env');

const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // Using default MemoryStore for simplicity as requested.
  // In production, a Postgres store would be used.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
});

module.exports = { sessionMiddleware };

