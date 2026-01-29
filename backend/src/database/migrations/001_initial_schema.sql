-- AI Counsellor Database Schema
-- PostgreSQL Database Migration Script

-- =====================================================
-- 1. DROP EXISTING TABLES (if exists)
-- =====================================================

DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS shortlists CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================================================
-- 2. CREATE USERS TABLE
-- =====================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);

-- =====================================================
-- 3. CREATE USER PROFILES TABLE
-- =====================================================

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Academic Background
    education_level VARCHAR(100),
    degree VARCHAR(100),
    major VARCHAR(100),
    graduation_year INTEGER,
    gpa NUMERIC(3, 2),
    
    -- Study Goals
    intended_degree VARCHAR(100),
    field_of_study VARCHAR(100),
    target_intake_year INTEGER,
    preferred_countries TEXT[], -- Array of countries
    
    -- Budget
    budget_min INTEGER,
    budget_max INTEGER,
    funding_plan VARCHAR(50), -- 'Self-funded', 'Scholarship', 'Loan'
    
    -- Exam Status
    ielts_status VARCHAR(50) DEFAULT 'Not Started',
    ielts_score NUMERIC(2, 1),
    gre_status VARCHAR(50) DEFAULT 'Not Started',
    gre_score INTEGER,
    sop_status VARCHAR(50) DEFAULT 'Not Started',
    
    -- Profile Completion
    is_completed BOOLEAN DEFAULT FALSE,
    current_stage VARCHAR(100) DEFAULT 'Building Profile',
    
    -- AI Generated Strength
    academic_strength VARCHAR(50),
    exam_strength VARCHAR(50),
    overall_readiness VARCHAR(50),
    improvement_areas TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster user_id lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- =====================================================
-- 4. CREATE UNIVERSITIES TABLE
-- =====================================================

CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    ranking INTEGER,
    
    -- Programs (JSONB for flexibility)
    programs JSONB DEFAULT '[]'::JSONB,
    
    -- Cost
    tuition_fee_min INTEGER,
    tuition_fee_max INTEGER,
    living_cost INTEGER,
    
    -- Requirements
    min_gpa NUMERIC(3, 2),
    min_ielts NUMERIC(2, 1),
    min_gre INTEGER,
    
    -- Acceptance
    acceptance_rate NUMERIC(4, 3), -- 0.000 to 1.000
    
    -- Additional Info
    application_deadline VARCHAR(50),
    website VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for filtering
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_ranking ON universities(ranking);
CREATE INDEX idx_universities_tuition ON universities(tuition_fee_max);

-- =====================================================
-- 5. CREATE SHORTLISTS TABLE
-- =====================================================

CREATE TABLE shortlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    university_id INTEGER NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    
    -- Locking
    is_locked BOOLEAN DEFAULT FALSE,
    locked_at TIMESTAMP WITH TIME ZONE,
    
    -- AI Analysis
    category VARCHAR(50), -- 'Dream', 'Target', 'Safe'
    ai_reasoning TEXT,
    risk_analysis TEXT,
    acceptance_likelihood VARCHAR(50), -- 'Low', 'Medium', 'High'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique shortlist per user-university combination
    UNIQUE(user_id, university_id)
);

-- Indexes
CREATE INDEX idx_shortlists_user_id ON shortlists(user_id);
CREATE INDEX idx_shortlists_university_id ON shortlists(university_id);
CREATE INDEX idx_shortlists_locked ON shortlists(is_locked);

-- =====================================================
-- 6. CREATE TODOS TABLE
-- =====================================================

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id) ON DELETE SET NULL,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'Exam', 'Document', 'Application', 'General'
    priority VARCHAR(50) DEFAULT 'Medium', -- 'Low', 'Medium', 'High'
    due_date TIMESTAMP WITH TIME ZONE,
    
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_university_id ON todos(university_id);
CREATE INDEX idx_todos_completed ON todos(is_completed);
CREATE INDEX idx_todos_due_date ON todos(due_date);

-- =====================================================
-- 7. CREATE UPDATED_AT TRIGGER FUNCTION
-- =====================================================

-- Function to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shortlists_updated_at
    BEFORE UPDATE ON shortlists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 8. GRANT PERMISSIONS (Optional)
-- =====================================================

-- If you want to grant permissions to specific user
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
