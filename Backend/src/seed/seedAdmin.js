const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const env = require('../config/env');

async function seedAdmin() {
  try {
    await mongoose.connect(env.MONGO_URI);

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
      process.exit(1);
    }

    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.error(`Admin ${ADMIN_EMAIL} already exists. Skipping.`);
      process.exit(0);
    }

    await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.error(`Admin created: ${ADMIN_EMAIL}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedAdmin();
