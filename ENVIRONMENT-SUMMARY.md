# 🔐 Environment Variables Summary

## ✅ What You Need for the App

### Required (Client-Side)

```env
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Get these from:**
- Supabase Dashboard → Settings → API
- **Project URL**: Copy from "Project URL" section
- **Anon Key**: Copy from "Project API keys" → "anon public"

---

## 📋 Your PostgreSQL Connection Info

You provided these connection parameters:

```
Host: aws-1-ap-south-1.pooler.supabase.com
Port: 5432
Database: postgres
User: postgres.pcrdpephzjfanaxelzgz
Pool Mode: session
```

### Connection String Format:

```env
DATABASE_URL=postgresql://postgres.pcrdpephzjfanaxelzgz:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**⚠️ Important:**
- Replace `YOUR_PASSWORD` with your actual database password
- Get password from: Supabase Dashboard → Settings → Database
- This is **optional** - only needed for direct PostgreSQL access

---

## 🎯 Which One to Use?

### For Next.js App (Current Setup) ✅
- **Use**: `NEXT_PUBLIC_SUPABASE_URL` (REST API)
- **URL**: `https://pcrdpephzjfanaxelzgz.supabase.co`
- **NOT**: The pooler URL

### For Direct PostgreSQL (Optional)
- **Use**: `DATABASE_URL` (Connection string)
- **URL**: `postgresql://...@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`
- **When**: Server-side operations, migrations, direct DB access

---

## 📝 Complete .env.local Template

```env
# ============================================
# REQUIRED: For Next.js App
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# OPTIONAL: Direct PostgreSQL Connection
# ============================================
# Only needed if you're doing server-side PostgreSQL operations
# Uncomment and add your password:
# DATABASE_URL=postgresql://postgres.pcrdpephzjfanaxelzgz:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## 🚀 For Vercel Deployment

Add to Vercel Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://pcrdpephzjfanaxelzgz.supabase.co`
   - Environments: Production, Preview, Development

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your actual anon key
   - Environments: Production, Preview, Development

**Note:** You typically don't need DATABASE_URL in Vercel unless you're using server-side PostgreSQL operations.

---

## 📚 Documentation

- **[ENV-SETUP.md](./ENV-SETUP.md)** - Complete environment setup guide
- **[.env.example](./.env.example)** - Template file with all options
- **[QUICK-START.md](./QUICK-START.md)** - Quick setup guide

---

## ✅ Quick Checklist

- [ ] Got Project URL from Supabase Dashboard
- [ ] Got Anon Key from Supabase Dashboard  
- [ ] Created `.env.local` from `.env.example`
- [ ] Added REST API credentials to `.env.local`
- [ ] (Optional) Added DATABASE_URL if needed for server-side
- [ ] Tested locally: `npm run dev`
- [ ] Added to Vercel for deployment

---

**The app uses the REST API, so you only need the Project URL and Anon Key!** ✅

