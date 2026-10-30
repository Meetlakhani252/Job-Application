-- Opportunities Table
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Job', 'Internship')),
    domain TEXT NOT NULL CHECK (domain IN ('Web Development', 'Data & AI', 'UI/UX Design', 'Marketing', 'Other')),
    location TEXT NOT NULL,
    experience TEXT NOT NULL,
    description TEXT NOT NULL,
    application_link TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Applications Table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_code TEXT NOT NULL UNIQUE,
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    resume_link TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (email, opportunity_id)
);

-- Admins Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_opportunities_title ON opportunities USING gin (title gin_trgm_ops);
CREATE INDEX idx_opportunities_domain ON opportunities(domain);

-- Enable pg_trgm for case-insensitive search if not enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;
