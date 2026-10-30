# Job Portal Server (Supabase Edition)

Express backend for the Job Portal, now migrated from MongoDB to Supabase (Postgres).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file based on `.env.example` and fill in the following:
   - `PORT`: Server port (e.g., 5000)
   - `SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service_role secret key (DO NOT expose to frontend)
   - `SESSION_SECRET`: Long random string for session management
   - `CLIENT_ORIGIN`: Allowed origin for CORS (e.g., http://localhost:5173)
   - `ADMIN_EMAIL`: Email for the initial admin seed
   - `ADMIN_PASSWORD`: Password for the initial admin seed

3. Database Schema:
   Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor to create the tables, constraints, and indexes.

4. Seed Admin:
   ```bash
   npm run seed
   ```

## Running the Server
```bash
npm run dev
```
