# 🚀 Vercel Deployment Guide

## Quick Deploy (5 Minutes)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Exhibition Registration App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/exhibition-ui.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `.next` (auto)
6. Add Environment Variables (see below)
7. Click **"Deploy"**

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? exhibition-ui (or your choice)
# - Directory? ./
# - Override settings? No
```

---

## 🔐 Environment Variables Setup

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add these two variables:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://pcrdpephzjfanaxelzgz.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_actual_anon_key_here
```

3. Select **"Production"**, **"Preview"**, and **"Development"** for both
4. Click **"Save"**

### Via Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://pcrdpephzjfanaxelzgz.supabase.co
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: your_actual_anon_key_here
# Select: Production, Preview, Development
```

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] **Build works locally**: `npm run build`
- [ ] **Environment variables set** in Vercel dashboard
- [ ] **Supabase database tables created** (run `supabase-setup.sql`)
- [ ] **Logo image added** to `public/images/logo.png`
- [ ] **Git repository created** and pushed to GitHub
- [ ] **No errors in console** when running locally

---

## 🧪 Test Build Locally

```bash
# Test production build
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting page data
# ✓ Generating static pages
# ✓ Finalizing page optimization

# Test production server
npm start
# Visit http://localhost:3000
```

---

## 📦 Build Configuration

The app is configured for Vercel with:

- ✅ **Next.js 14** (App Router)
- ✅ **Standalone output** for optimal performance
- ✅ **Image optimization** enabled
- ✅ **Automatic builds** on git push
- ✅ **Preview deployments** for pull requests

---

## 🔄 Deployment Workflow

### Automatic Deployments:

1. **Push to `main` branch** → Deploys to production
2. **Create pull request** → Creates preview deployment
3. **Merge PR** → Updates production

### Manual Deployment:

```bash
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain (e.g., `exhibition.yourschool.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional):

1. Go to **Settings** → **Analytics**
2. Enable **Web Analytics** (free tier available)
3. View real-time visitor data

### Logs:

- View deployment logs in Vercel Dashboard
- Check function logs for serverless functions
- Monitor build times and errors

---

## 🔧 Troubleshooting

### Build Fails?

**Error: "Module not found"**
```bash
# Ensure all dependencies are in package.json
npm install
npm run build
```

**Error: "Environment variable missing"**
- Check Vercel Dashboard → Settings → Environment Variables
- Ensure variables are set for Production, Preview, and Development
- Redeploy after adding variables

**Error: "Image optimization failed"**
- Check `next.config.js` image configuration
- Ensure logo image exists in `public/images/`
- Check image format (PNG, JPG, SVG supported)

### App Works Locally But Not on Vercel?

1. **Check environment variables** are set correctly
2. **Verify Supabase URL** is correct (not pooler URL)
3. **Check build logs** in Vercel Dashboard
4. **Test production build locally**: `npm run build && npm start`

### Database Connection Issues?

1. Verify Supabase project is active
2. Check RLS policies are set correctly
3. Ensure anon key is correct (not service_role key)
4. Test Supabase connection from Vercel logs

---

## 🚀 Post-Deployment

### 1. Test Your Live Site

Visit your Vercel URL (e.g., `https://exhibition-ui.vercel.app`):
- ✅ Intro animation works
- ✅ Form submission works
- ✅ Data saves to Supabase
- ✅ Success screen displays
- ✅ Mobile responsive

### 2. Set Up Database

If not done already:
1. Go to Supabase Dashboard
2. Run `supabase-setup.sql` in SQL Editor
3. Verify tables are created

### 3. Monitor Performance

- Check Vercel Analytics
- Monitor Supabase usage
- Review error logs

---

## 📱 Mobile Testing

Test on real devices:
1. Open your Vercel URL on mobile
2. Test form submission
3. Verify program selection works
4. Check animations are smooth

---

## 🔒 Security Checklist

- [ ] Environment variables are set (not hardcoded)
- [ ] Supabase RLS policies enabled
- [ ] No sensitive data in client code
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured if needed

---

## 📈 Performance Optimization

Vercel automatically provides:
- ✅ **CDN** - Global content delivery
- ✅ **Edge Functions** - Fast API responses
- ✅ **Image Optimization** - Automatic image optimization
- ✅ **Automatic HTTPS** - SSL certificates
- ✅ **Analytics** - Performance monitoring

---

## 🔄 Updating Your App

### Automatic Updates:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. Vercel automatically rebuilds and deploys

### Manual Update:

```bash
vercel --prod
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Status**: https://www.vercel-status.com
- **Community**: https://github.com/vercel/vercel/discussions

---

## 🎯 Quick Reference

### Deploy Commands:
```bash
# First deployment
vercel

# Production deployment
vercel --prod

# Preview deployment
vercel

# View deployments
vercel ls
```

### Environment Variables:
```bash
# Add variable
vercel env add VARIABLE_NAME

# List variables
vercel env ls

# Remove variable
vercel env rm VARIABLE_NAME
```

### Project Info:
```bash
# View project info
vercel inspect

# View logs
vercel logs
```

---

## ✅ Deployment Checklist

Before going live:
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Supabase database set up
- [ ] Logo image added
- [ ] Tested on mobile
- [ ] Form submission works
- [ ] Data saves to database
- [ ] No console errors
- [ ] Analytics enabled (optional)
- [ ] Custom domain configured (optional)

---

## 🎉 You're Ready!

Your Exhibition Registration app is now ready for Vercel deployment!

**Next Steps:**
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

Your app will be live in minutes! 🚀

