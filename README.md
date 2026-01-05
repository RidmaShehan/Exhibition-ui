# Exhibition Registration UI

A modern, responsive Next.js 14 application for Times School Higher Education exhibition visitor registration with beautiful GSAP animations.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deploy to Vercel

See **[DEPLOY.md](./DEPLOY.md)** for quick deployment guide or **[VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)** for detailed instructions.

---

## ✨ Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Professional Animations**: Smooth GSAP-powered animations throughout
- **Mobile-First Design**: Fully responsive across all devices
- **Multi-Program Selection**: Button-style course selector
- **Automatic Data Collection**: IP, location, device, browser tracking
- **Form Validation**: Client-side validation with helpful error messages
- **Supabase Integration**: PostgreSQL database with organized tables
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Production-Ready**: Optimized for Vercel deployment

---

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account (for database)

---

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase-setup.sql` to create tables
3. Verify tables are created

### 4. Add Logo (Optional)

Place your logo at: `public/images/logo.png`

See **[LOGO-SETUP.md](./LOGO-SETUP.md)** for details.

---

## 📁 Project Structure

```
Exhibition-ui/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ExhibitionRegistration.tsx
│   ├── IntroScreen.tsx
│   ├── RegistrationForm.tsx
│   ├── SuccessScreen.tsx
│   ├── ProgramSelector.tsx
│   ├── Logo.tsx
│   └── PaperPlane.tsx
├── lib/                   # Business logic
│   ├── supabase.ts       # Database operations
│   ├── validation.ts     # Form validation
│   └── metadata.ts       # IP/location tracking
├── types/                 # TypeScript types
│   └── index.ts
├── public/                # Static assets
│   └── images/
│       └── logo.png      # Your logo here
└── [config files]
```

---

## 🎨 Key Features

### Multi-Program Selection
- Button-style selection interface
- Select multiple courses
- Grouped by category
- Visual feedback with checkmarks

### Automatic Data Collection
- IP address & location
- Device type (Mobile/Tablet/Desktop)
- Browser information
- Date & time of submission

### Database Structure
- **exhibition_visitors** - Core visitor data
- **programs** - Available courses
- **visitor_programs** - Selected programs
- **visitor_metadata** - Location & device data

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See **[DEPLOY.md](./DEPLOY.md)** for quick guide.

---

## 📚 Documentation

- **[DEPLOY.md](./DEPLOY.md)** - Quick deployment guide
- **[VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)** - Complete Vercel setup
- **[LOGO-SETUP.md](./LOGO-SETUP.md)** - Logo configuration
- **[QUICK-START.md](./QUICK-START.md)** - Database setup
- **[FEATURES.md](./FEATURES.md)** - Feature documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture

---

## 🧪 Testing

```bash
# Run build test
npm run build

# Start production server
npm start
```

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🔒 Security

- Row Level Security (RLS) enabled
- Environment variables for secrets
- Input validation
- HTTPS on Vercel

---

## 📄 License

This project is private and proprietary.

---

## 🆘 Support

For issues or questions:
1. Check documentation files
2. Review Vercel deployment logs
3. Check Supabase connection
4. Verify environment variables

---

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Run database setup SQL
3. ✅ Add your logo image
4. ✅ Deploy to Vercel
5. ✅ Test on production

**Ready to deploy!** 🚀
