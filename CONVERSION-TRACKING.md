# 📊 Conversion Tracking Feature

## ✅ What's Been Added

Your database now tracks whether visitor inquiries have been **converted** (e.g., enrolled, contacted, followed up).

### New Fields Added:

1. **`is_converted`** (BOOLEAN)
   - Default: `false`
   - Tracks if inquiry has been converted
   - `true` = Converted, `false` = Not converted

2. **`converted_at`** (TIMESTAMP)
   - Default: `null`
   - Records when the conversion happened
   - Automatically set when marked as converted

---

## 🗄️ Database Changes

### Updated Table: `exhibition_visitors`

```sql
exhibition_visitors
├── id
├── name
├── work_phone
├── is_converted        ← NEW: Conversion status
├── converted_at        ← NEW: Conversion timestamp
└── created_at
```

---

## 🚀 Setup Instructions

### Option 1: Fresh Database Setup

If you're setting up a new database, run the updated `supabase-setup.sql` file. It includes the conversion fields.

### Option 2: Existing Database Migration

If you already have data, run the migration script:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open `migration-add-conversion.sql`
3. Copy and paste the entire script
4. Click **Run**

This will:
- ✅ Add `is_converted` column (defaults to `false` for existing records)
- ✅ Add `converted_at` column (null for existing records)
- ✅ Create indexes for faster queries
- ✅ Update the view to include conversion data

---

## 💻 Using Conversion Tracking

### Mark Visitor as Converted

```typescript
import { markVisitorAsConverted } from '@/lib/supabase';

// Mark a visitor as converted
const result = await markVisitorAsConverted(visitorId);

if (result.success) {
  console.log('Visitor marked as converted!');
} else {
  console.error('Error:', result.error);
}
```

### Check Conversion Status

```typescript
import { getVisitorDetails } from '@/lib/supabase';

const details = await getVisitorDetails(visitorId);

if (details) {
  console.log('Is Converted:', details.is_converted);
  console.log('Converted At:', details.converted_at);
}
```

---

## 📊 Useful SQL Queries

### View All Converted Visitors

```sql
SELECT 
  v.id,
  v.name,
  v.work_phone,
  v.is_converted,
  v.converted_at,
  v.created_at,
  ARRAY_AGG(p.program_name) as programs
FROM exhibition_visitors v
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
WHERE v.is_converted = true
GROUP BY v.id, v.name, v.work_phone, v.is_converted, v.converted_at, v.created_at
ORDER BY v.converted_at DESC;
```

### View Not Converted Visitors

```sql
SELECT 
  v.id,
  v.name,
  v.work_phone,
  v.created_at,
  ARRAY_AGG(p.program_name) as programs
FROM exhibition_visitors v
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
WHERE v.is_converted = false
GROUP BY v.id, v.name, v.work_phone, v.created_at
ORDER BY v.created_at DESC;
```

### Conversion Statistics

```sql
SELECT 
  COUNT(*) as total_visitors,
  COUNT(*) FILTER (WHERE is_converted = true) as converted_count,
  COUNT(*) FILTER (WHERE is_converted = false) as not_converted_count,
  ROUND(100.0 * COUNT(*) FILTER (WHERE is_converted = true) / COUNT(*), 2) as conversion_rate_percent
FROM exhibition_visitors;
```

### Conversion Rate by Program

```sql
SELECT 
  p.program_name,
  COUNT(DISTINCT v.id) as total_inquiries,
  COUNT(DISTINCT v.id) FILTER (WHERE v.is_converted = true) as converted,
  ROUND(100.0 * COUNT(DISTINCT v.id) FILTER (WHERE v.is_converted = true) / COUNT(DISTINCT v.id), 2) as conversion_rate
FROM programs p
LEFT JOIN visitor_programs vp ON p.id = vp.program_id
LEFT JOIN exhibition_visitors v ON vp.visitor_id = v.id
WHERE p.is_active = true
GROUP BY p.id, p.program_name
HAVING COUNT(DISTINCT v.id) > 0
ORDER BY conversion_rate DESC;
```

### Recent Conversions

```sql
SELECT 
  v.name,
  v.work_phone,
  v.converted_at,
  ARRAY_AGG(p.program_name) as programs
FROM exhibition_visitors v
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
WHERE v.is_converted = true
  AND v.converted_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY v.id, v.name, v.work_phone, v.converted_at
ORDER BY v.converted_at DESC;
```

---

## 🔄 Manual Conversion Update

### In Supabase Dashboard

1. Go to **Table Editor** → **exhibition_visitors**
2. Find the visitor you want to mark as converted
3. Click **Edit**
4. Set `is_converted` to `true`
5. Set `converted_at` to current timestamp (or leave null)
6. Click **Save**

### Using SQL

```sql
-- Mark a specific visitor as converted
UPDATE exhibition_visitors
SET 
  is_converted = true,
  converted_at = NOW()
WHERE id = 'visitor-uuid-here';

-- Mark multiple visitors as converted
UPDATE exhibition_visitors
SET 
  is_converted = true,
  converted_at = NOW()
WHERE id IN ('uuid1', 'uuid2', 'uuid3');
```

---

## 📈 Analytics Dashboard Queries

### Daily Conversion Rate

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as inquiries,
  COUNT(*) FILTER (WHERE is_converted = true) as conversions,
  ROUND(100.0 * COUNT(*) FILTER (WHERE is_converted = true) / COUNT(*), 2) as conversion_rate
FROM exhibition_visitors
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Conversion Time Analysis

```sql
SELECT 
  v.name,
  v.created_at as inquiry_date,
  v.converted_at,
  v.converted_at - v.created_at as time_to_convert
FROM exhibition_visitors v
WHERE v.is_converted = true
ORDER BY v.converted_at DESC;
```

---

## ✅ Default Behavior

- **New registrations**: Automatically set `is_converted = false`
- **Existing records**: Migration sets `is_converted = false` for all existing records
- **Conversion**: Use `markVisitorAsConverted()` function or manual update

---

## 🔒 Security

The conversion fields are included in:
- ✅ Row Level Security (RLS) policies
- ✅ Public read access (for viewing)
- ⚠️ Update access should be restricted to authenticated users (for production)

**Recommended:** Add an update policy for authenticated users only:

```sql
-- Allow authenticated users to update conversion status
CREATE POLICY "Allow authenticated updates" ON exhibition_visitors
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
```

---

## 📝 Summary

- ✅ **Conversion tracking** added to database
- ✅ **Migration script** for existing databases
- ✅ **Helper function** to mark visitors as converted
- ✅ **Analytics queries** for conversion insights
- ✅ **Default values** set correctly

**Your database now tracks conversion status for all inquiries!** 🎉

