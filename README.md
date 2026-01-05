# Exhibition Registration UI

A modern, responsive Next.js 14 application for Times School Higher Education exhibition visitor registration with beautiful GSAP animations.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS
- **Professional Animations**: Smooth GSAP-powered animations throughout
- **Mobile-First Design**: Fully responsive across all devices
- **Form Validation**: Client-side validation with helpful error messages
- **Supabase Integration**: Ready-to-use database integration
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Clean Architecture**: Modular component structure following SOLID principles

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
cd Exhibition-ui
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database** (if using Supabase)

Create a table in your Supabase project:
```sql
CREATE TABLE exhibition_visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  work_phone TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE exhibition_visitors ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts (adjust as needed)
CREATE POLICY "Allow public inserts" ON exhibition_visitors
  FOR INSERT TO public
  WITH CHECK (true);
```

## 🚦 Running the Application

**Development mode:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
Exhibition-ui/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ExhibitionRegistration.tsx  # Main component
│   ├── IntroScreen.tsx            # Intro animation screen
│   ├── RegistrationForm.tsx       # Form component
│   ├── SuccessScreen.tsx          # Success state component
│   ├── Logo.tsx                   # Logo SVG component
│   └── PaperPlane.tsx             # Paper plane animation
├── lib/
│   ├── supabase.ts         # Supabase client and API calls
│   └── validation.ts       # Form validation logic
├── types/
│   └── index.ts            # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Key Features Explained

### Animations
All animations are powered by GSAP for smooth, performant transitions:
- **Intro Screen**: Logo fade-in, character-by-character title animation
- **Form Entry**: Staggered element animations
- **Paper Plane**: Flying animation on form submission
- **Success Screen**: Bounce animations and staggered reveals

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-friendly buttons and inputs
- Optimized typography scaling

### Form Validation
- Required field validation
- Phone number format validation
- Real-time error clearing
- Accessible error messages

## 🔧 Configuration

### Customizing Animations
Edit timing and easing in component files:
```typescript
// Example: components/IntroScreen.tsx
tl.fromTo(
  element,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
);
```

### Styling
Modify `tailwind.config.ts` for design system changes:
```typescript
theme: {
  extend: {
    colors: {
      // Add custom colors
    },
    fontFamily: {
      // Add custom fonts
    },
  },
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain TypeScript strict mode compliance
3. Use functional components with hooks
4. Follow the DRY and SOLID principles
5. Ensure mobile responsiveness

## 📄 License

This project is private and proprietary.

## 🆘 Troubleshooting

**Issue: Animations not working**
- Ensure GSAP is installed: `npm install gsap`
- Check browser console for errors

**Issue: Supabase connection failing**
- Verify environment variables in `.env.local`
- Check Supabase project status
- Ensure table schema matches expected structure

**Issue: Build errors**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18.x+)

## 📞 Support

For issues or questions, please contact the development team.

