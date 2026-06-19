-- Migration: Add district column to exhibition_visitors table
-- Run this query in your Supabase SQL Editor:
-- Dashboard > SQL Editor > New Query > Paste and Run

ALTER TABLE exhibition_visitors ADD COLUMN IF NOT EXISTS district TEXT;
