# Database Setup Guide

## 🎯 Quick Setup (3 Steps)

### Step 1: Get Your Supabase Credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **pcrdpephzjfanaxelzgz**
3. Click **Settings** (⚙️) in the left sidebar
4. Click **API**
5. Copy these two values:

   **Project URL** (looks like):
   ```
   https://pcrdpephzjfanaxelzgz.supabase.co
   ```

   **Project API keys** → **anon** **public** (looks like):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
   ```

### Step 2: Update .env.local

Open `.env.local` in your project root and replace with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**⚠️ Important:**
- Use the **Project URL**, NOT the pooler URL
- Use the **anon public** key, NOT the service_role key
- Remove the placeholder text and paste your actual keys

### Step 3: Create Database Table

1. In Supabase Dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy the contents of `supabase-setup.sql` file
4. Paste into the SQL editor
5. Click **Run** (or press `Cmd/Ctrl + Enter`)
6. You should see "Success. No rows returned"

---

## ✅ Verify Setup

After completing the steps above, restart your dev server:

```bash
# Stop the current server (Ctrl+C in terminal)
npm run dev
```

Then test the form:
1. Go to http://localhost:3000
2. Fill in the form
3. Click Submit
4. Check your browser console - should see successful API response
5. In Supabase Dashboard → **Table Editor** → **exhibition_visitors** → You should see your data!

---

## 🔍 Troubleshooting

### Error: "Invalid API key"
- Double-check you copied the **anon public** key, not service_role
- Ensure there are no extra spaces or line breaks
- The key should start with `eyJ`

### Error: "Failed to fetch"
- Verify the Project URL is correct
- Check if your Supabase project is active (not paused)
- Ensure `.env.local` is in the project root

### Error: "permission denied for table exhibition_visitors"
- Make sure you ran the SQL script completely
- Check that RLS policies were created
- Try running the SQL script again

### Data not appearing in database
- Open browser DevTools → Console tab
- Look for error messages
- Check Network tab for failed requests

---

## 📊 View Your Data

To see registered visitors:

1. Go to Supabase Dashboard
2. Click **Table Editor** in the left sidebar
3. Select **exhibition_visitors** table
4. You'll see all submissions with:
   - Name
   - Work Phone
   - Region (if provided)
   - Created At timestamp

---

## 🔒 Security Notes

### Current Setup (Development)
- ✅ Row Level Security (RLS) enabled
- ✅ Public can INSERT new visitors
- ✅ Public can SELECT (read) visitor data
- ⚠️ Anyone can submit and read data

### For Production (Recommended)
Consider adding:
- Rate limiting on inserts
- CAPTCHA verification
- Authentication requirements
- Data validation at database level
- Restrict SELECT policy to authenticated users only

---

## 🗄️ Database Schema

```sql
exhibition_visitors
├── id (UUID, PRIMARY KEY, auto-generated)
├── name (TEXT, required)
├── work_phone (TEXT, required)
├── region (TEXT, optional)
└── created_at (TIMESTAMP, auto-generated)
```

---

## 📊 Useful SQL Queries

### View all visitors
```sql
SELECT * FROM exhibition_visitors 
ORDER BY created_at DESC;
```

### Count total visitors
```sql
SELECT COUNT(*) as total_visitors 
FROM exhibition_visitors;
```

### Visitors by region
```sql
SELECT region, COUNT(*) as count 
FROM exhibition_visitors 
WHERE region IS NOT NULL
GROUP BY region 
ORDER BY count DESC;
```

### Today's visitors
```sql
SELECT * FROM exhibition_visitors 
WHERE created_at >= CURRENT_DATE 
ORDER BY created_at DESC;
```

### Export to CSV
In Supabase Dashboard:
1. Go to Table Editor → exhibition_visitors
2. Click the **"..."** menu (top right)
3. Select **Export to CSV**

---

## 🔄 Reset/Clear Data

To delete all test data:

```sql
-- BE CAREFUL: This deletes ALL data
DELETE FROM exhibition_visitors;
```

To delete specific entries:

```sql
-- Delete entries from a specific date
DELETE FROM exhibition_visitors 
WHERE created_at::date = '2026-01-05';

-- Delete test entries
DELETE FROM exhibition_visitors 
WHERE name LIKE '%test%' OR name LIKE '%Test%';
```

---

## 📱 Testing Checklist

- [ ] .env.local file created with correct credentials
- [ ] SQL script executed successfully
- [ ] Dev server restarted
- [ ] Form submission works
- [ ] No errors in browser console
- [ ] Data appears in Supabase Table Editor
- [ ] Mobile view tested
- [ ] Multiple submissions work

---

## 🆘 Still Having Issues?

1. Check `.env.local` exists in project root (not in `/app` or `/components`)
2. Ensure the file name is exactly `.env.local` (with the dot)
3. Restart your dev server after changing `.env.local`
4. Check browser console for specific error messages
5. Verify your Supabase project is active (check dashboard)

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

