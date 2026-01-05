# 🔐 Environment Variables Setup Guide

## ⚠️ Important: Two Different Connection Methods

Your Supabase project has **two ways** to connect:

### 1. **REST API** (Used by Next.js App) ✅
- **For**: Client-side Next.js application
- **URL Format**: `https://YOUR_PROJECT_ID.supabase.co`
- **What you need**: Project URL + Anon Key

### 2. **Direct PostgreSQL** (Optional)
- **For**: Server-side operations, migrations, direct DB access
- **URL Format**: `postgresql://user:password@host:port/database`
- **What you need**: Connection string or individual components

---

## 📋 Required for Next.js App

### Get Your REST API Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **pcrdpephzjfanaxelzgz**
3. Click **Settings** (⚙️) → **API**
4. Copy these values:

```
Project URL: https://pcrdpephzjfanaxelzgz.supabase.co
Anon Key: eyJhbGc... (long string starting with eyJ)
```

### Update `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**⚠️ Important:**
- Use the **Project URL**, NOT the pooler URL
- Use the **anon public** key, NOT service_role key
- The pooler URL (`aws-1-ap-south-1.pooler.supabase.com`) is for direct PostgreSQL access, not for the app

---

## 🗄️ Direct PostgreSQL Connection (Optional)

If you need direct PostgreSQL access (for migrations, server-side scripts, etc.):

### Option 1: Connection String

```env
DATABASE_URL=postgresql://postgres.pcrdpephzjfanaxelzgz:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**Get your password from:**
- Supabase Dashboard → Settings → Database → Database password

### Option 2: Individual Components

```env
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.pcrdpephzjfanaxelzgz
DB_PASSWORD=your_password_here
DB_POOL_MODE=session
```

---

## 🔍 Connection Details

### Your PostgreSQL Connection Info:

```
Host: aws-1-ap-south-1.pooler.supabase.com
Port: 5432
Database: postgres
User: postgres.pcrdpephzjfanaxelzgz
Pool Mode: session
```

### Connection String Format:

```
postgresql://postgres.pcrdpephzjfanaxelzgz:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**Replace `[YOUR-PASSWORD]` with your actual database password!**

---

## ✅ What the App Uses

### Current Setup (Client-Side)

The Next.js app uses:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - REST API endpoint
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key

**This is correct and sufficient for the app!**

### Direct PostgreSQL (Server-Side Only)

If you need direct PostgreSQL access:
- Use `DATABASE_URL` or individual DB_* variables
- Only for server-side operations (API routes, migrations)
- NOT exposed to client-side code

---

## 🚀 For Vercel Deployment

### Add to Vercel Environment Variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these two (required):

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://pcrdpephzjfanaxelzgz.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_actual_anon_key_here
```

3. Select all environments: Production, Preview, Development
4. Save

**Note:** You don't need to add DATABASE_URL to Vercel unless you're using server-side PostgreSQL operations.

---

## 📝 Complete .env.local Example

```env
# ============================================
# REQUIRED: For Next.js App
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# OPTIONAL: For Direct PostgreSQL Access
# ============================================
# Only needed for server-side operations
# DATABASE_URL=postgresql://postgres.pcrdpephzjfanaxelzgz:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## 🔒 Security Notes

### ✅ Safe to Use (Client-Side)
- `NEXT_PUBLIC_SUPABASE_URL` - Public REST API endpoint
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (safe for client)

### ⚠️ Keep Secret (Server-Side Only)
- `DATABASE_URL` - Contains password, never expose to client
- `DB_PASSWORD` - Never expose to client
- Service Role Key - Never use in client-side code

---

## 🧪 Verify Your Setup

### Test REST API Connection:

```bash
# Check if environment variables are set
node check-env.js
```

### Test Database Connection (if using direct PostgreSQL):

```bash
# Using psql
psql "postgresql://postgres.pcrdpephzjfanaxelzgz:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"

# Or using connection string
psql $DATABASE_URL
```

---

## 📚 Where to Get Credentials

### REST API (For App):
1. Supabase Dashboard → Settings → API
2. **Project URL**: Copy from "Project URL" section
3. **Anon Key**: Copy from "Project API keys" → "anon public"

### PostgreSQL (For Direct Access):
1. Supabase Dashboard → Settings → Database
2. **Connection string**: Copy from "Connection string" section
3. **Password**: Set in "Database password" section

---

## ❓ FAQ

### Q: Which URL should I use?
**A:** For the Next.js app, use the REST API URL (`https://pcrdpephzjfanaxelzgz.supabase.co`), NOT the pooler URL.

### Q: Can I use the pooler URL?
**A:** The pooler URL is for direct PostgreSQL connections (server-side). The app uses the REST API, so use the Project URL instead.

### Q: Do I need DATABASE_URL?
**A:** Only if you're doing server-side PostgreSQL operations. The app works fine with just the REST API credentials.

### Q: Where do I get my password?
**A:** Supabase Dashboard → Settings → Database → Database password (you may need to reset it if you don't know it)

---

## ✅ Quick Checklist

- [ ] Got Project URL from Supabase Dashboard
- [ ] Got Anon Key from Supabase Dashboard
- [ ] Updated `.env.local` with REST API credentials
- [ ] Tested locally: `npm run dev`
- [ ] Added to Vercel environment variables (for deployment)
- [ ] Verified app connects to Supabase

---

## 🆘 Troubleshooting

### "Invalid API key" error?
- Check you're using the **anon public** key, not service_role
- Verify the key starts with `eyJ`
- Ensure no extra spaces in `.env.local`

### "Failed to fetch" error?
- Verify Project URL is correct (not pooler URL)
- Check Supabase project is active
- Ensure `.env.local` is in project root

### Connection timeout?
- Check your internet connection
- Verify Supabase project is not paused
- Check Supabase status page

---

**Your app uses the REST API, so you only need the Project URL and Anon Key!** ✅

