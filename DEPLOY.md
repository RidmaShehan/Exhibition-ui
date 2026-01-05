# 🚀 Quick Vercel Deployment

## ⚡ Fastest Way (3 Steps)

### 1️⃣ Push to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/exhibition-ui.git
git push -u origin main
```

### 2️⃣ Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. **Add Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://pcrdpephzjfanaxelzgz.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your_anon_key_here`
5. Click **"Deploy"**

### 3️⃣ Done! 🎉

Your app will be live at: `https://your-project.vercel.app`

---

## 📋 Environment Variables (NOT Database Connection!)

**⚠️ Important:** You only need environment variables. You do NOT need to set up a database connection in Vercel!

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL
https://pcrdpephzjfanaxelzgz.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
your_actual_anon_key_from_supabase
```

**Important:** Select all environments (Production, Preview, Development)

---

## ✅ Pre-Deploy Checklist

- [x] Build works: `npm run build` ✅
- [ ] Code pushed to GitHub
- [ ] Environment variables ready
- [ ] Supabase database set up

---

## 🔧 Troubleshooting

**Build fails?**
- Check environment variables are set
- Ensure all dependencies in package.json

**App doesn't work?**
- Verify Supabase credentials
- Check Vercel deployment logs
- Test Supabase connection

---

## 📖 Full Guide

See **VERCEL-DEPLOYMENT.md** for complete instructions.

---

**Your app is ready to deploy!** 🚀

