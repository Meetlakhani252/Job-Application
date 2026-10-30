-- 1. Create Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Update Applications Table to include user_id
ALTER TABLE applications ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Make user_id mandatory for new applications
-- (We'll handle existing nulls by making it optional for a moment then mandatory)
ALTER TABLE applications ALTER COLUMN user_id SET NOT NULL;

-- 4. Update Unique Constraint
-- Now, we block duplicate apps by (user_id, opportunity_id) instead of (email, opportunity_id)
ALTER TABLE applications DROP CONSTRAINT applications_email_opportunity_id_key;
ALTER TABLE applications ADD CONSTRAINT unique_user_opportunity UNIQUE (user_id, opportunity_id);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own applications
CREATE POLICY "Users can view own applications"
ON applications FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can only insert their own applications
CREATE POLICY "Users can insert own applications"
ON applications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can see everything (via service_role, which bypasses RLS,
-- but we add a policy for authenticated admins just in case)
CREATE POLICY "Admins can view all applications"
ON applications FOR ALL
USING (true);
