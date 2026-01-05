# Logo Image Instructions

## 📸 How to Add Your Logo

### Step 1: Prepare Your Image

1. **Recommended formats**: PNG, JPG, or SVG
2. **Recommended size**: 
   - Square format (1:1 ratio) works best
   - Minimum: 400x400 pixels
   - Optimal: 800x800 pixels or larger
   - Maximum file size: 2MB

### Step 2: Add Your Image

1. Place your logo image in this folder (`public/images/`)
2. Name it: **`logo.png`** (or `logo.jpg`, `logo.svg`)

**Example:**
```
public/
  └── images/
      └── logo.png  ← Your logo here
```

### Step 3: Supported File Names

The component will automatically look for:
- `logo.png`
- `logo.jpg`
- `logo.jpeg`
- `logo.svg`
- `logo.webp`

### Step 4: Verify

1. Restart your dev server: `npm run dev`
2. Visit http://localhost:3000
3. Your logo should appear on the welcome screen!

---

## 🎨 Image Tips

### Best Practices:
- ✅ Use transparent background (PNG) for best results
- ✅ Square images work best (1:1 aspect ratio)
- ✅ High resolution for crisp display
- ✅ White or light backgrounds work well with the gray container

### If Your Logo Doesn't Appear:

1. **Check file name** - Must be exactly `logo.png` (or .jpg, .svg)
2. **Check file location** - Must be in `public/images/` folder
3. **Check file format** - Use PNG, JPG, or SVG
4. **Restart server** - Stop and restart `npm run dev`
5. **Hard refresh browser** - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

---

## 🔄 Using a Different Image Name

If you want to use a different filename, edit `components/IntroScreen.tsx`:

```tsx
<Logo 
  src="/images/your-logo-name.png"  // Change this
  alt="Your Logo"
/>
```

---

## 📱 Responsive Sizing

The logo automatically scales:
- **Mobile**: 96px × 96px
- **Tablet**: 128px × 128px  
- **Desktop**: 144px × 144px

The component uses Next.js Image optimization for best performance!

---

## 🎯 Current Setup

The logo component is configured to:
- ✅ Use Next.js Image optimization
- ✅ Maintain aspect ratio
- ✅ Load with priority (faster display)
- ✅ Fallback to SVG if image not found
- ✅ Fully responsive across devices

---

## 💡 Alternative: External Image URL

If your logo is hosted online, you can use:

```tsx
<Logo 
  src="https://yourdomain.com/logo.png"
  alt="Your Logo"
/>
```

Then update `next.config.js` to allow external images (see below).

---

## 🔧 Allowing External Images (Optional)

If using external URLs, update `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
      },
    ],
  },
}

module.exports = nextConfig
```

