const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const env = require('./config/env');
const { sessionMiddleware } = require('./config/session');
const router = require('./routes/index');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: env.CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(mongoSanitize());
app.use(sessionMiddleware);

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
