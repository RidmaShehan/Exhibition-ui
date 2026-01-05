# 🚀 Production Deployment Guide

## ✅ Production-Ready Configuration

Your app is now configured for production deployment. All local-specific settings have been removed.

---

## 🔐 Environment Variables (Production)

### ⚠️ IMPORTANT: Production Uses Vercel Environment Variables

Your app is configured to use **production environment variables from Vercel**, not local `.env` files.

### Set in Vercel Dashboard

Add these environment variables in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://pcrdpephzjfanaxelzgz.supabase.co
Environments: ☑ Production ☑ Preview ☑ Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_actual_anon_key_here
Environments: ☑ Production ☑ Preview ☑ Development
```

**⚠️ Important:**
- ✅ **Production uses Vercel environment variables** (not `.env.local`)
- ✅ Set environment variables in Vercel Dashboard
- ✅ Enable for all environments (Production, Preview, Development)
- ✅ Redeploy after adding variables

📖 See **[PRODUCTION-ENV.md](./PRODUCTION-ENV.md)** for detailed setup guide.

---

## 📦 Production Build

### Build Command

```bash
npm run build
```

### Production Optimizations Enabled

- ✅ **SWC Minification** - Faster builds
- ✅ **Compression** - Gzip compression
- ✅ **Image Optimization** - AVIF and WebP formats
- ✅ **Security Headers** - X-Frame-Options, CSP, etc.
- ✅ **Standalone Output** - Optimized for deployment
- ✅ **Cache Headers** - Better performance

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **Add Environment Variables** (see above)
4. Click **Deploy**

### Step 3: Verify

After deployment:
- ✅ Check build logs for errors
- ✅ Test the live URL
- ✅ Verify form submission works
- ✅ Check Supabase data is saved

---

## 🔒 Production Security

### Enabled Security Features

- ✅ **X-Frame-Options** - Prevents clickjacking
- ✅ **X-Content-Type-Options** - Prevents MIME sniffing
- ✅ **Referrer-Policy** - Controls referrer information
- ✅ **HTTPS** - Automatic on Vercel
- ✅ **Environment Variables** - Secure storage

### Supabase Security

- ✅ **Row Level Security (RLS)** - Enabled
- ✅ **Anon Key** - Public key (safe for client)
- ✅ **No Service Role Key** - Never exposed

---

## 📊 Production Performance

### Optimizations

- **Image Optimization**: AVIF/WebP formats
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages
- **CDN**: Global content delivery (Vercel)
- **Edge Functions**: Fast API responses

### Expected Performance

- **First Load JS**: ~176 KB
- **Page Size**: ~89 KB
- **Build Time**: ~30-60 seconds
- **Deploy Time**: ~2-3 minutes

---

## 🧪 Pre-Deployment Checklist

Before going live:

- [ ] Environment variables set in Vercel
- [ ] Supabase database tables created
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Logo image added (optional)
- [ ] Tested form submission
- [ ] Verified data saves to Supabase
- [ ] Mobile responsive tested
- [ ] Production URL tested

---

## 🚀 Deployment Steps

### 1. Prepare Code

```bash
# Ensure all changes are committed
git status

# Push to GitHub
git push origin main
```

### 2. Deploy to Vercel

1. **Vercel Dashboard** → **Add New Project**
2. **Import Repository** from GitHub
3. **Configure Project**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)

### 3. Add Environment Variables

**Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL = https://pcrdpephzjfanaxelzgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key_here
```

**Select all environments**: Production, Preview, Development

### 4. Deploy

Click **Deploy** and wait for build to complete.

---

## 📱 Post-Deployment

### Test Your Live Site

1. **Visit your Vercel URL**: `https://your-project.vercel.app`
2. **Test Features**:
   - ✅ Intro animation
   - ✅ Form submission
   - ✅ Program selection
   - ✅ Data saving
   - ✅ Success screen
   - ✅ Mobile responsiveness

### Monitor

- **Vercel Dashboard** → View deployment logs
- **Supabase Dashboard** → Check data is being saved
- **Browser Console** → Check for errors

---

## 🔄 Updates & Maintenance

### Deploy Updates

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically rebuilds and deploys
```

### Environment Variable Updates

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. **Edit** the variable
3. **Redeploy** (automatic on next push, or manual)

---

## 🆘 Troubleshooting

### Build Fails

- Check environment variables are set
- Verify Supabase credentials
- Review build logs in Vercel

### App Doesn't Work

- Verify environment variables in Vercel
- Check Supabase connection
- Review browser console for errors
- Check Supabase dashboard for data

### Performance Issues

- Check Vercel Analytics
- Review build output size
- Optimize images if needed
- Check Supabase query performance

---

## 📈 Production Monitoring

### Vercel Analytics

1. **Settings** → **Analytics**
2. Enable **Web Analytics**
3. View real-time metrics

### Supabase Monitoring

- **Dashboard** → View database usage
- **Logs** → Check API requests
- **Table Editor** → Monitor data

---

## ✅ Production Checklist

- [x] Production build configuration ✅
- [x] Security headers enabled ✅
- [x] Image optimization enabled ✅
- [x] Compression enabled ✅
- [x] Standalone output mode ✅
- [ ] Environment variables set in Vercel
- [ ] Database tables created
- [ ] Deployed to Vercel
- [ ] Tested on production URL
- [ ] Monitoring enabled

---

## 🎯 Your Production URL

After deployment, your app will be live at:

```
https://your-project-name.vercel.app
```

Or with custom domain:
```
https://exhibition.yourschool.com
```

---

## 📚 Related Documentation

- **[DEPLOY.md](./DEPLOY.md)** - Quick deployment guide
- **[VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)** - Detailed Vercel setup
- **[ENV-SETUP.md](./ENV-SETUP.md)** - Environment variables guide

---

**Your app is production-ready! Deploy now!** 🚀

