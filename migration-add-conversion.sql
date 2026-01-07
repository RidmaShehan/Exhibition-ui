-- ============================================
-- MIGRATION: Add Conversion Status Fields
-- ============================================
-- Run this in Supabase SQL Editor if you already have the exhibition_visitors table
-- This adds the conversion tracking fields without affecting existing data

-- Add is_converted column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exhibition_visitors' 
    AND column_name = 'is_converted'
  ) THEN
    ALTER TABLE exhibition_visitors 
    ADD COLUMN is_converted BOOLEAN DEFAULT false;
    
    RAISE NOTICE 'Added is_converted column';
  ELSE
    RAISE NOTICE 'is_converted column already exists';
  END IF;
END $$;

-- Add converted_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exhibition_visitors' 
    AND column_name = 'converted_at'
  ) THEN
    ALTER TABLE exhibition_visitors 
    ADD COLUMN converted_at TIMESTAMP WITH TIME ZONE;
    
    RAISE NOTICE 'Added converted_at column';
  ELSE
    RAISE NOTICE 'converted_at column already exists';
  END IF;
END $$;

-- Create indexes for conversion status queries
CREATE INDEX IF NOT EXISTS idx_visitors_is_converted ON exhibition_visitors(is_converted);
CREATE INDEX IF NOT EXISTS idx_visitors_converted_at ON exhibition_visitors(converted_at DESC);

-- Update the view to include conversion fields
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

-- Verify the changes
SELECT 
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'exhibition_visitors'
  AND column_name IN ('is_converted', 'converted_at')
ORDER BY column_name;

-- Show conversion statistics
SELECT 
  COUNT(*) as total_visitors,
  COUNT(*) FILTER (WHERE is_converted = true) as converted_count,
  COUNT(*) FILTER (WHERE is_converted = false) as not_converted_count,
  ROUND(100.0 * COUNT(*) FILTER (WHERE is_converted = true) / COUNT(*), 2) as conversion_rate_percent
FROM exhibition_visitors;

