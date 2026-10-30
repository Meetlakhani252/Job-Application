const { supabase } = require('../config/db');
const env = require('../config/env');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error('ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
      process.exit(1);
    }

    const email = ADMIN_EMAIL.toLowerCase();
    const { data: existing } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      console.log(`Admin ${email} already exists. Skipping.`);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const { error } = await supabase
      .from('admins')
      .insert([{
        email: email,
        password_hash: passwordHash
      }]);

    if (error) throw error;

    console.log(`Admin created: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedAdmin();
