-- Exhibition Registration Database Setup
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

-- ============================================
-- TABLE 1: Visitors (Main Registration Data)
-- ============================================
CREATE TABLE IF NOT EXISTS exhibition_visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  work_phone TEXT NOT NULL,
  is_converted BOOLEAN DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 2: Programs/Courses Master List
-- ============================================
CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  program_name TEXT NOT NULL UNIQUE,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample programs
INSERT INTO programs (program_name, category) VALUES
  ('Computer Science', 'Engineering'),
  ('Business Administration', 'Business'),
  ('Mechanical Engineering', 'Engineering'),
  ('Data Science', 'Technology'),
  ('Civil Engineering', 'Engineering'),
  ('Marketing', 'Business'),
  ('Artificial Intelligence', 'Technology'),
  ('Architecture', 'Design'),
  ('Electrical Engineering', 'Engineering'),
  ('Finance', 'Business'),
  ('Cyber Security', 'Technology'),
  ('Biotechnology', 'Science')
ON CONFLICT (program_name) DO NOTHING;

-- ============================================
-- TABLE 3: Visitor Programs (Selected Courses)
-- ============================================
CREATE TABLE IF NOT EXISTS visitor_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id UUID NOT NULL REFERENCES exhibition_visitors(id) ON DELETE CASCADE,
  program_id INTEGER NOT NULL REFERENCES programs(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(visitor_id, program_id)
);

-- ============================================
-- TABLE 4: Visitor Metadata (IP, Location, etc)
-- ============================================
CREATE TABLE IF NOT EXISTS visitor_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id UUID NOT NULL REFERENCES exhibition_visitors(id) ON DELETE CASCADE,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  user_agent TEXT,
  browser TEXT,
  device TEXT,
  submission_date DATE DEFAULT CURRENT_DATE,
  submission_time TIME DEFAULT CURRENT_TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(visitor_id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE exhibition_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_metadata ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - Allow Public Access
-- ============================================

-- Visitors table
CREATE POLICY "Allow public inserts on visitors" ON exhibition_visitors
  FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public reads on visitors" ON exhibition_visitors
  FOR SELECT TO public USING (true);

-- Programs table (read-only for public)
CREATE POLICY "Allow public reads on programs" ON programs
  FOR SELECT TO public USING (is_active = true);

-- Visitor programs table
CREATE POLICY "Allow public inserts on visitor_programs" ON visitor_programs
  FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public reads on visitor_programs" ON visitor_programs
  FOR SELECT TO public USING (true);

-- Visitor metadata table
CREATE POLICY "Allow public inserts on visitor_metadata" ON visitor_metadata
  FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public reads on visitor_metadata" ON visitor_metadata
  FOR SELECT TO public USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON exhibition_visitors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_programs_visitor_id ON visitor_programs(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_programs_program_id ON visitor_programs(program_id);
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_visitor_id ON visitor_metadata(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_submission_date ON visitor_metadata(submission_date DESC);

-- ============================================
-- USEFUL VIEWS
-- ============================================

-- View: Complete visitor information with programs
CREATE OR REPLACE VIEW visitor_details AS
SELECT 
  v.id,
  v.name,
  v.work_phone,
  v.is_converted,
  v.converted_at,
  v.created_at,
  vm.ip_address,
  vm.country,
  vm.city,
  vm.timezone,
  vm.browser,
  vm.device,
  vm.submission_date,
  vm.submission_time,
  ARRAY_AGG(p.program_name ORDER BY p.program_name) as selected_programs,
  COUNT(vp.program_id) as program_count
FROM exhibition_visitors v
LEFT JOIN visitor_metadata vm ON v.id = vm.visitor_id
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
GROUP BY v.id, v.name, v.work_phone, v.is_converted, v.converted_at, v.created_at,
         vm.ip_address, vm.country, vm.city, vm.timezone,
         vm.browser, vm.device, vm.submission_date, vm.submission_time;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('exhibition_visitors', 'programs', 'visitor_programs', 'visitor_metadata')
ORDER BY table_name;

-- Check programs were inserted
SELECT COUNT(*) as total_programs FROM programs WHERE is_active = true;

-- Show all programs
SELECT id, program_name, category FROM programs WHERE is_active = true ORDER BY category, program_name;

-- ============================================
-- MIGRATION: Add conversion fields (if table exists)
-- ============================================
-- Run this if you already have the exhibition_visitors table
-- It will add the conversion fields without affecting existing data

DO $$ 
BEGIN
  -- Add is_converted column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exhibition_visitors' 
    AND column_name = 'is_converted'
  ) THEN
    ALTER TABLE exhibition_visitors 
    ADD COLUMN is_converted BOOLEAN DEFAULT false;
  END IF;

  -- Add converted_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exhibition_visitors' 
    AND column_name = 'converted_at'
  ) THEN
    ALTER TABLE exhibition_visitors 
    ADD COLUMN converted_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Create index for conversion status queries
CREATE INDEX IF NOT EXISTS idx_visitors_is_converted ON exhibition_visitors(is_converted);
CREATE INDEX IF NOT EXISTS idx_visitors_converted_at ON exhibition_visitors(converted_at DESC);
