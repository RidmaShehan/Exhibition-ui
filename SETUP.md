# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP (animation library)
- Supabase client
- Lucide React (icons)

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

### 3a. Option A: Without Supabase (Quick Start)

If you want to test the UI without setting up a database:

1. Leave the `.env.local` file empty or with placeholder values
2. The app will run in demo mode
3. Form submissions will be logged to console

```bash
npm run dev
```

Visit: http://localhost:3000

### 3b. Option B: With Supabase (Production Setup)

#### Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready (~2 minutes)

#### Get Your Credentials

1. Go to Project Settings > API
2. Copy:
   - Project URL (under "Project URL")
   - Anon/Public Key (under "Project API keys")

#### Update .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Create Database Table

1. Go to SQL Editor in Supabase dashboard
2. Run this SQL:

```sql
-- Create the table
CREATE TABLE exhibition_visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  work_phone TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE exhibition_visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (you may want to restrict this in production)
CREATE POLICY "Allow public inserts" ON exhibition_visitors
  FOR INSERT TO public
  WITH CHECK (true);

-- Optional: Allow reading your own data
CREATE POLICY "Allow public reads" ON exhibition_visitors
  FOR SELECT TO public
  USING (true);
```

3. Click "Run" to execute

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🎉 You're Done!

The application should now be running with:
- ✅ Beautiful intro animation
- ✅ Responsive registration form
- ✅ Form validation
- ✅ Paper plane animation on submit
- ✅ Success screen with details
- ✅ Mobile-friendly design

## Testing the Form

1. Wait for intro animation to complete
2. Fill in the form:
   - Name: Any text
   - Phone: Numbers, spaces, dashes, parentheses (e.g., +1 (555) 123-4567)
   - Region: Optional text field
3. Click "Submit Registration" or press Enter
4. Watch the paper plane animation
5. See your success screen

## Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Troubleshooting

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors

```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules
npm install
```

### TypeScript errors

```bash
# Check your Node.js version (needs 18+)
node --version

# If lower than 18, update Node.js
```

### Supabase connection issues

1. Check `.env.local` file exists in project root
2. Verify credentials are correct
3. Check Supabase project is active
4. Ensure table `exhibition_visitors` exists

## Next Steps

- **Customize Design**: Edit Tailwind classes in components
- **Modify Animations**: Adjust GSAP timelines in component files
- **Add Features**: Extend form fields in `types/index.ts`
- **Deploy**: Use Vercel, Netlify, or your preferred hosting

## Support

Check the main [README.md](README.md) for detailed documentation.

