// Quick script to verify your environment variables are set correctly
// Run with: node check-env.js

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking Supabase Configuration...\n');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let allGood = true;

// Check URL
if (!url) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL is not set');
  allGood = false;
} else if (url === 'your_supabase_url_here' || url.includes('YOUR-PASSWORD')) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL still has placeholder value');
  console.log('   Current value:', url);
  allGood = false;
} else if (!url.startsWith('https://')) {
  console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL should start with https://');
  console.log('   Current value:', url);
  allGood = false;
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL is set correctly');
  console.log('   Project URL:', url);
}

// Check Key
if (!key) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  allGood = false;
} else if (key === 'your_anon_key_here') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY still has placeholder value');
  allGood = false;
} else if (!key.startsWith('eyJ')) {
  console.log('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY should start with "eyJ"');
  console.log('   Are you sure you copied the anon public key?');
  allGood = false;
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set correctly');
  console.log('   Key starts with:', key.substring(0, 20) + '...');
}

console.log('\n' + '='.repeat(50) + '\n');

if (allGood) {
  console.log('🎉 Configuration looks good!');
  console.log('   Restart your dev server: npm run dev\n');
} else {
  console.log('⚠️  Please fix the issues above');
  console.log('   1. Edit .env.local in your project root');
  console.log('   2. Add your actual Supabase credentials');
  console.log('   3. Run this script again to verify\n');
  console.log('📖 See DATABASE-SETUP.md for detailed instructions\n');
}

