-- SQL script to update programs table list
-- Run this query in your Supabase SQL Editor:
-- Dashboard > SQL Editor > New Query > Paste and Run
-- This script dynamically detects your database schema (whether it uses old or new columns) and executes correctly.

DO $$
DECLARE
    has_category_code boolean;
    has_program_name boolean;
    has_is_active boolean;
    has_code boolean;
BEGIN
    -- Step 1: Clear existing visitor program links to avoid foreign key errors
    DELETE FROM visitor_programs;

    -- Step 2: Delete all existing programs
    DELETE FROM programs;

    -- Step 3: Reset the ID auto-increment sequence to start from 1
    ALTER SEQUENCE IF EXISTS programs_id_seq RESTART WITH 1;

    -- Step 4: Check which columns exist in table 'programs' to adapt dynamically
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'programs' AND column_name = 'category_code'
    ) INTO has_category_code;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'programs' AND column_name = 'program_name'
    ) INTO has_program_name;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'programs' AND column_name = 'is_active'
    ) INTO has_is_active;

    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'programs' AND column_name = 'code'
    ) INTO has_code;

    -- Step 5: Execute the correct INSERT mapping
    IF has_category_code THEN
        -- Schema Option 1: Using category_code, code, name
        IF has_code THEN
            INSERT INTO programs (category_code, code, name) VALUES
              ('undergraduate', 'DBM', 'Diploma in Business Management'),
              ('undergraduate', 'ADBM', 'Advanced Diploma in Business Management'),
              ('undergraduate', 'CSM', 'Certificate in Sales & Marketing'),
              ('undergraduate', 'DSM', 'Diploma in Sales & Marketing'),
              ('undergraduate', 'CHR', 'Certificate in Human Resource'),
              ('undergraduate', 'DHR', 'Diploma in Human Resource'),
              ('diploma_certificate', 'DPEDS', 'Diploma in Professional English & Digital Skills'),
              ('diploma_certificate', 'ACPE', 'Advanced Certificate in Professional English');
        ELSE
            INSERT INTO programs (category_code, name) VALUES
              ('undergraduate', 'Diploma in Business Management'),
              ('undergraduate', 'Advanced Diploma in Business Management'),
              ('undergraduate', 'Certificate in Sales & Marketing'),
              ('undergraduate', 'Diploma in Sales & Marketing'),
              ('undergraduate', 'Certificate in Human Resource'),
              ('undergraduate', 'Diploma in Human Resource'),
              ('diploma_certificate', 'Diploma in Professional English & Digital Skills'),
              ('diploma_certificate', 'Advanced Certificate in Professional English');
        END IF;
    ELSE
        -- Schema Option 2: Using category, program_name, is_active
        IF has_is_active THEN
            INSERT INTO programs (category, program_name, is_active) VALUES
              ('Undergraduate', 'Diploma in Business Management', true),
              ('Undergraduate', 'Advanced Diploma in Business Management', true),
              ('Undergraduate', 'Certificate in Sales & Marketing', true),
              ('Undergraduate', 'Diploma in Sales & Marketing', true),
              ('Undergraduate', 'Certificate in Human Resource', true),
              ('Undergraduate', 'Diploma in Human Resource', true),
              ('Diploma certificate', 'Diploma in Professional English & Digital Skills', true),
              ('Diploma certificate', 'Advanced Certificate in Professional English', true);
        ELSE
            INSERT INTO programs (category, program_name) VALUES
              ('Undergraduate', 'Diploma in Business Management'),
              ('Undergraduate', 'Advanced Diploma in Business Management'),
              ('Undergraduate', 'Certificate in Sales & Marketing'),
              ('Undergraduate', 'Diploma in Sales & Marketing'),
              ('Undergraduate', 'Certificate in Human Resource'),
              ('Undergraduate', 'Diploma in Human Resource'),
              ('Diploma certificate', 'Diploma in Professional English & Digital Skills'),
              ('Diploma certificate', 'Advanced Certificate in Professional English');
        END IF;
    END IF;
END $$;

-- Step 6: Verify results
SELECT * FROM programs ORDER BY id;
