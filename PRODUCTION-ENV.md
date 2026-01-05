# 🔐 Production Environment Variables Setup

## ✅ Production Configuration

Your app is configured to use **production environment variables** from Vercel, not local `.env` files.

---

## ⚠️ Important: No Database Connection Needed!

**Your app uses Supabase REST API, NOT direct PostgreSQL connection.**

You **do NOT need** to configure:
- ❌ Database connection in Vercel
- ❌ Session pooler
- ❌ PostgreSQL connection string

**You ONLY need environment variables!**

---

## 🚀 Set Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**

**Note:** This is NOT a database connection setup. Just environment variables!

### Step 2: Add Production Variables

Add these two variables:

#### Variable 1: `NEXT_PUBLIC_SUPABASE_URL`

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://pcrdpephzjfanaxelzgz.supabase.co
Environments: ☑ Production ☑ Preview ☑ Development
```

#### Variable 2: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_actual_anon_key_here
Environments: ☑ Production ☑ Preview ☑ Development
```

**Get your anon key from:**
- Supabase Dashboard → Settings → API → Project API keys → **anon public**

### Step 3: Save and Redeploy

1. Click **Save** for each variable
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. Wait for build to complete

---

## 🔍 How It Works

### Production (Vercel)

- ✅ Uses environment variables from **Vercel Dashboard**
- ✅ No `.env.local` file needed
- ✅ Secure and managed by Vercel
- ✅ Same variables for Production, Preview, and Development

### Local Development (Optional)

If you want to test locally:

1. Create `.env.local` (for local testing only)
2. Add the same variables
3. Run `npm run dev`
4. **Note:** `.env.local` is gitignored and won't affect production

---

## 📋 Environment Variable Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel
- [ ] Both variables enabled for Production, Preview, Development
- [ ] Values are correct (no typos)
- [ ] Redeployed after adding variables

---

## ✅ Verify Production Environment

### Check in Vercel

1. **Deployments** → Click on a deployment
2. **Build Logs** → Check for environment variable errors
3. **Runtime Logs** → Verify app connects to Supabase

### Test Your Live Site

1. Visit your production URL
2. Open browser DevTools → Console
3. Should see no environment variable errors
4. Form submission should work
5. Data should save to Supabase

---

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify both variables are set
3. Check they're enabled for Production
4. Redeploy your app

### Error: "Invalid API key"

**Solution:**
1. Verify you copied the **anon public** key (not service_role)
2. Check for extra spaces or line breaks
3. Key should start with `eyJ`
4. Update in Vercel and redeploy

### App Works Locally But Not in Production

**Solution:**
1. Check Vercel environment variables are set
2. Verify values match your local `.env.local`
3. Check Vercel build logs for errors
4. Ensure variables are enabled for Production environment

---

## 🔒 Security Notes

### ✅ Safe for Production

- `NEXT_PUBLIC_SUPABASE_URL` - Public REST API endpoint
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (safe for client)

### ⚠️ Never Expose

- Service Role Key - Never use in client-side code
- Database Password - Never expose to client
- Any secrets - Keep in Vercel environment variables only

---

## 📝 Production Environment Variables

### Required Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional Variables (Server-Side Only)

```env
# Only if you need direct PostgreSQL access
DATABASE_URL=postgresql://postgres.pcrdpephzjfanaxelzgz:PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## 🎯 Quick Setup

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. **Add** `NEXT_PUBLIC_SUPABASE_URL` = `https://pcrdpephzjfanaxelzgz.supabase.co`
3. **Add** `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your_anon_key`
4. **Select** all environments (Production, Preview, Development)
5. **Save** and **Redeploy**

---

## ✅ Production Ready

Once environment variables are set in Vercel:

- ✅ App uses production environment variables
- ✅ No local `.env` files needed
- ✅ Secure and managed by Vercel
- ✅ Works across all environments
- ✅ Ready for production use

---

**Your app is configured for production environment variables!** 🚀

Set them in Vercel Dashboard and deploy!

