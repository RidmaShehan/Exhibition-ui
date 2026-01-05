# 🎯 Updated Features

## ✨ What's New

### 1. **Multi-Program Selection** 
- ✅ Removed region field
- ✅ Added interactive program/course selector
- ✅ Button-style selection (click to toggle)
- ✅ Select multiple programs
- ✅ Grouped by category (Engineering, Business, Technology, etc.)
- ✅ Visual feedback with checkmarks
- ✅ Shows selection count

### 2. **Automatic Data Collection**
The system now automatically captures:
- 📍 **IP Address** - Visitor's public IP
- 🌍 **Location** - Country, city, region
- 🕐 **Timezone** - User's timezone
- 📱 **Device Type** - Mobile, Tablet, or Desktop
- 🌐 **Browser** - Chrome, Safari, Firefox, etc.
- 📅 **Date & Time** - Submission date and time
- 🖥️ **User Agent** - Full browser string

### 3. **Separate Database Tables**
Data is organized into 4 tables:
- **exhibition_visitors** - Core visitor info (name, phone)
- **programs** - Master list of available programs
- **visitor_programs** - Selected programs (many-to-many)
- **visitor_metadata** - IP, location, device data

## 🎨 UI Components

### Program Selector
```
┌─────────────────────────────────────────┐
│ ENGINEERING                             │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ ✓ Computer   │ │   Mechanical │      │
│ │   Science    │ │   Engineering│      │
│ └──────────────┘ └──────────────┘      │
│                                         │
│ BUSINESS                                │
│ ┌──────────────┐ ┌──────────────┐      │
│ │   Marketing  │ │ ✓ Finance    │      │
│ └──────────────┘ └──────────────┘      │
│                                         │
│ ✓ 2 programs selected                  │
└─────────────────────────────────────────┘
```

### Success Screen
Now shows:
- Visitor name
- Phone number
- **List of selected programs** (as chips/badges)
- Clean, organized layout

## 📊 Database Schema

### Table: `exhibition_visitors`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Visitor name |
| work_phone | TEXT | Phone number |
| created_at | TIMESTAMP | Registration time |

### Table: `programs`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| program_name | TEXT | Program name |
| category | TEXT | Category (Engineering, Business, etc.) |
| is_active | BOOLEAN | Active status |

### Table: `visitor_programs`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| visitor_id | UUID | Links to visitor |
| program_id | INTEGER | Links to program |

### Table: `visitor_metadata`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| visitor_id | UUID | Links to visitor |
| ip_address | TEXT | IP address |
| country | TEXT | Country name |
| city | TEXT | City name |
| region | TEXT | Region/state |
| timezone | TEXT | Timezone |
| user_agent | TEXT | Full user agent |
| browser | TEXT | Browser name |
| device | TEXT | Device type |
| submission_date | DATE | Date of submission |
| submission_time | TIME | Time of submission |

## 🔍 Viewing Data

### In Supabase Dashboard

**Option 1: Individual Tables**
- Go to Table Editor → Select table
- View `exhibition_visitors`, `programs`, `visitor_programs`, `visitor_metadata`

**Option 2: Combined View**
- Go to SQL Editor
- Run this query:

```sql
SELECT 
  v.name,
  v.work_phone,
  vm.city,
  vm.country,
  vm.device,
  vm.browser,
  vm.submission_date,
  ARRAY_AGG(p.program_name) as programs
FROM exhibition_visitors v
LEFT JOIN visitor_metadata vm ON v.id = vm.visitor_id
LEFT JOIN visitor_programs vp ON v.id = vp.visitor_id
LEFT JOIN programs p ON vp.program_id = p.id
GROUP BY v.id, v.name, v.work_phone, vm.city, vm.country, 
         vm.device, vm.browser, vm.submission_date
ORDER BY v.created_at DESC;
```

## 📈 Analytics Queries

### Most Popular Programs
```sql
SELECT 
  p.program_name,
  p.category,
  COUNT(vp.visitor_id) as selection_count
FROM programs p
LEFT JOIN visitor_programs vp ON p.id = vp.program_id
GROUP BY p.id, p.program_name, p.category
ORDER BY selection_count DESC;
```

### Visitors by Location
```sql
SELECT 
  country,
  city,
  COUNT(*) as visitor_count
FROM visitor_metadata
WHERE country IS NOT NULL
GROUP BY country, city
ORDER BY visitor_count DESC;
```

### Device Statistics
```sql
SELECT 
  device,
  browser,
  COUNT(*) as count
FROM visitor_metadata
GROUP BY device, browser
ORDER BY count DESC;
```

### Daily Registrations
```sql
SELECT 
  submission_date,
  COUNT(*) as registrations,
  COUNT(DISTINCT vm.country) as countries
FROM visitor_metadata vm
JOIN exhibition_visitors v ON vm.visitor_id = v.id
GROUP BY submission_date
ORDER BY submission_date DESC;
```

## 🎯 Form Validation

### Required Fields
- ✅ Name (cannot be empty)
- ✅ Phone (must be valid format)
- ✅ Programs (at least one must be selected)

### Validation Rules
- **Name**: Any text, minimum 1 character
- **Phone**: Numbers, spaces, dashes, parentheses, plus sign
  - Examples: `+1 (555) 123-4567`, `555-123-4567`, `+91 98765 43210`
- **Programs**: Must select at least 1 program

## 🔒 Privacy & Security

### Data Collection
- IP and location data are collected for analytics
- No sensitive personal data is stored
- User agent strings help identify issues

### Security Features
- Row Level Security (RLS) enabled
- Public can only INSERT their own data
- Prepared statements prevent SQL injection
- HTTPS encryption in transit

### Compliance Considerations
For production use, consider:
- Adding privacy policy link
- GDPR consent checkbox (for EU visitors)
- Data retention policy
- Right to deletion mechanism

## 🚀 Performance

### Optimizations
- Database indexes on frequently queried fields
- GSAP for hardware-accelerated animations
- Lazy loading of program data
- Debounced API calls

### Load Times
- Intro animation: ~3.5 seconds
- Program loading: ~200-500ms
- Form submission: ~2.5 seconds (with animation)

## 📱 Mobile Experience

All features are fully responsive:
- Touch-friendly program buttons
- Optimized spacing for small screens
- Readable text sizes on all devices
- Smooth scrolling and animations

## 🛠️ Customization

### Adding New Programs
```sql
INSERT INTO programs (program_name, category) 
VALUES ('New Program Name', 'Category');
```

### Disabling Programs
```sql
UPDATE programs 
SET is_active = false 
WHERE program_name = 'Program to Disable';
```

### Changing Categories
```sql
UPDATE programs 
SET category = 'New Category' 
WHERE category = 'Old Category';
```

## 📞 IP Geolocation Services

The app uses free geolocation services:
- **Primary**: ipapi.co (free tier)
- **Fallback**: api.ipify.org (IP only)

### Limitations
- ~1000 requests/day on free tier
- Some IPs may not have location data
- VPN/Proxy users show VPN location

### Upgrade Options
For production with high traffic:
- [IPStack](https://ipstack.com/) - 10,000/month free
- [IP Geolocation](https://ipgeolocation.io/) - 1,000/day free
- [AbstractAPI](https://www.abstractapi.com/) - 20,000/month free

## 🔄 Migration from Old Schema

If you have existing data:

```sql
-- Backup old data
CREATE TABLE exhibition_visitors_backup AS 
SELECT * FROM exhibition_visitors;

-- Drop old table
DROP TABLE exhibition_visitors;

-- Run the new setup script
-- Then migrate if needed (region → metadata)
```

