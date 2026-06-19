-- SQL script to clear old programs and insert the 8 new programs
-- Run this query in your Supabase SQL Editor:
-- Dashboard > SQL Editor > New Query > Paste and Run

-- Step 1: Delete all existing program links to avoid foreign key constraint issues
DELETE FROM visitor_programs;

-- Step 2: Delete all existing programs
DELETE FROM programs;

-- Step 3: Reset the ID sequence of the programs table (so the next insert starts from ID 1)
ALTER SEQUENCE IF EXISTS programs_id_seq RESTART WITH 1;

-- Step 4: Insert the new clean programs list
INSERT INTO programs (category_code, code, name) VALUES
  ('undergraduate', 'DBM', 'Diploma in Business Management'),
  ('undergraduate', 'ADBM', 'Advanced Diploma in Business Management'),
  ('undergraduate', 'CSM', 'Certificate in Sales & Marketing'),
  ('undergraduate', 'DSM', 'Diploma in Sales & Marketing'),
  ('undergraduate', 'CHR', 'Certificate in Human Resource'),
  ('undergraduate', 'DHR', 'Diploma in Human Resource'),
  ('diploma_certificate', 'DPEDS', 'Diploma in Professional English & Digital Skills'),
  ('diploma_certificate', 'ACPE', 'Advanced Certificate in Professional English');

-- Verification Query: Check inserted programs
SELECT id, category_code, code, name FROM programs ORDER BY id;
