const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function connectDB() {
  // Supabase client is already initialized.
  // This is kept for compatibility with existing server.js flow.
  console.log("Supabase client initialized");
}

module.exports = { supabase, connectDB };
