const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const env = require('./env');

const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: env.MONGO_URI,
    // Only update session record in MongoDB when something changes (performance)
    touchAfter: 24 * 3600,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    // Must be true in production behind HTTPS — set via env if needed
    secure: false,
    sameSite: 'lax',
  },
});

module.exports = { sessionMiddleware };
