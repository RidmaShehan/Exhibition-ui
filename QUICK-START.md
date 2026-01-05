# 🚀 Quick Database Setup

## What You Need To Do (3 Steps)

### ① Get Your Credentials from Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project: **pcrdpephzjfanaxelzgz**
3. Click **Settings** → **API**
4. Copy these TWO things:

```
Project URL: https://pcrdpephzjfanaxelzgz.supabase.co
Anon Key: eyJhbGc... (long string starting with eyJ)
```

### ② Edit `.env.local` File

Open `.env.local` in your project root and paste your actual values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Save the file!**

### ③ Create Database Tables

1. In Supabase Dashboard → **SQL Editor**
2. Click **New query**
3. Copy ALL the code from `supabase-setup.sql` (177 lines)
4. Paste and click **Run**

This will create:
- ✅ 4 tables (visitors, programs, visitor_programs, metadata)
- ✅ 12 sample programs (Computer Science, Business Admin, etc.)
- ✅ Security policies
- ✅ Performance indexes
- ✅ Useful views

---

## 🧪 Test It

```bash
# Stop your server (Ctrl+C)
# Restart it
npm run dev
```

Go to http://localhost:3000 and:
1. Fill in name and phone
2. **Select one or more programs** (click buttons to select)
3. Submit the form

Check Supabase Dashboard → **Table Editor**:
- **exhibition_visitors** - See the visitor
- **visitor_programs** - See selected programs
- **visitor_metadata** - See IP, location, device info

---

## ✅ Verify Setup

```bash
node check-env.js
```

This will check if your `.env.local` is configured correctly.

---

## 🎯 What's New

### Multi-Program Selection
- ✅ Removed "region" field
- ✅ Added program selector with buttons
- ✅ Select multiple courses at once
- ✅ Grouped by category (Engineering, Business, etc.)

### Auto Data Collection
System now captures:
- 📍 IP address & location
- 🌍 Country, city, timezone
- 📱 Device type (Mobile/Tablet/Desktop)
- 🌐 Browser name
- 📅 Date & time of submission

### Database Structure
Data is split into 4 tables for better organization:
1. **exhibition_visitors** - Basic info
2. **programs** - Available courses
3. **visitor_programs** - Selections
4. **visitor_metadata** - Location & device data

---

## 📊 View All Data

In Supabase SQL Editor, run:

```sql
SELECT 
  v.name,
  v.work_phone,
  vm.city,
  vm.country,
  vm.device,
  ARRAY_AGG(p.program_name) as selected_programs
FROM exhibition_visitors v
LEFT JOIN visitor_metadata vm ON v.id = vm.visitor_id
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
GROUP BY v.id, v.name, v.work_phone, vm.city, vm.country, vm.device
ORDER BY v.created_at DESC;
```

---

## 🔧 Customize Programs

To add your own programs:

```sql
INSERT INTO programs (program_name, category) VALUES
  ('Psychology', 'Science'),
  ('Economics', 'Business'),
  ('Graphic Design', 'Design');
```

To disable a program:

```sql
UPDATE programs 
SET is_active = false 
WHERE program_name = 'Architecture';
```

---

## 📖 Need More Help?

- **FEATURES.md** - Complete feature documentation
- **DATABASE-SETUP.md** - Detailed setup guide
- **ARCHITECTURE.md** - Technical architecture

---

## 🆘 Troubleshooting

### Programs not loading?
- Check browser console for errors
- Verify SQL script ran successfully
- Check that `programs` table has data: `SELECT * FROM programs;`

### Metadata not showing?
- Geolocation API may be rate-limited
- Check browser console for network errors
- Works offline but without location data

### Form not submitting?
- Check all 3 fields are filled
- Must select at least 1 program
- Check browser console for errors
