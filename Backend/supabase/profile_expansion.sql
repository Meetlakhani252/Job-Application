-- 1. Update profiles table to include more details
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS portfolio_link TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- 2. Update applications table to include more depth
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS education_at_time_of_app TEXT,
ADD COLUMN IF NOT EXISTS skills_at_time_of_app TEXT[],
ADD COLUMN IF NOT EXISTS resume_url TEXT;
