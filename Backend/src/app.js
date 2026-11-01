const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const { sessionMiddleware } = require('./config/session');
const router = require('./routes/index');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [
  env.CLIENT_ORIGIN,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean).map(o => o.replace(/\/+$/, ''));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, server-to-server)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/+$/, '');
    const isAllowed =
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.vercel.app') ||
      cleanOrigin.includes('localhost');

    if (isAllowed) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(sessionMiddleware);

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Rooklet Backend API Server is active and operational',
    endpoints: {
      opportunities: '/api/opportunities',
      auth: '/api/auth',
      applications: '/api/applications',
    },
  });
});

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
