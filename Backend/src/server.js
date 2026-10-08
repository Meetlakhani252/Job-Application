const app = require('./app');
const { connectDB } = require('./config/db');
const env = require('./config/env');

connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      console.error(`Server running on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not start server:', err);
    process.exit(1);
  });
