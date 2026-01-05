# 🖼️ Logo Setup Guide

## Quick Start

1. **Add your logo image** to: `public/images/logo.png`
2. **Restart dev server**: `npm run dev`
3. **Done!** Your logo will appear on the welcome screen

---

## 📁 File Location

```
Exhibition-ui/
└── public/
    └── images/
        └── logo.png  ← Place your logo here
```

---

## ✅ Supported Formats

- PNG (recommended - supports transparency)
- JPG/JPEG
- SVG (vector - scales perfectly)
- WebP

---

## 📐 Recommended Image Specs

- **Format**: Square (1:1 ratio)
- **Size**: 800×800 pixels (or larger)
- **Background**: Transparent (PNG) or white
- **File size**: Under 2MB

---

## 🎨 Current Logo Display

Your logo will appear:
- ✅ On the welcome/intro screen
- ✅ Inside a rounded gray container
- ✅ With shadow and border
- ✅ Responsive sizing (scales on mobile/tablet/desktop)
- ✅ Smooth fade-in animation

---

## 🔄 If Logo Doesn't Show

1. ✅ Check file is named exactly: `logo.png`
2. ✅ Check file is in: `public/images/` folder
3. ✅ Restart dev server: Stop (Ctrl+C) then `npm run dev`
4. ✅ Hard refresh browser: `Cmd+Shift+R` or `Ctrl+Shift+R`
5. ✅ Check browser console for errors

---

## 🎯 Custom Image Path

To use a different filename or location, edit `components/IntroScreen.tsx`:

```tsx
<Logo 
  src="/images/your-custom-name.png"  // Change this
  alt="Your Logo"
/>
```

---

## 🌐 Using External Image URL

If your logo is hosted online:

1. Edit `components/IntroScreen.tsx`:
```tsx
<Logo 
  src="https://yourdomain.com/path/to/logo.png"
  alt="Your Logo"
/>
```

2. Update `next.config.js` to allow external images:
```js
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
```

---

## 📱 Responsive Behavior

The logo automatically sizes:
- **Mobile** (≤640px): 96px × 96px
- **Tablet** (≤768px): 128px × 128px
- **Desktop** (>768px): 144px × 144px

---

## ✨ Features

- ✅ Next.js Image optimization (faster loading)
- ✅ Automatic responsive sizing
- ✅ Priority loading (shows immediately)
- ✅ Fallback to SVG if image missing
- ✅ Smooth GSAP animations
- ✅ Maintains aspect ratio

---

## 🆘 Troubleshooting

### Image not showing?
- Verify file path: `public/images/logo.png`
- Check file name is exactly `logo.png` (case-sensitive)
- Restart dev server
- Clear browser cache

### Image looks blurry?
- Use higher resolution (800px+)
- Use PNG or SVG format
- Check image isn't being stretched

### Image too large/small?
- Edit `components/Logo.tsx` className
- Adjust padding in `components/IntroScreen.tsx`

### Want to remove the gray container?
Edit `components/IntroScreen.tsx` and remove the wrapper div:
```tsx
<Logo 
  src="/images/logo.png" 
  alt="Times School Higher Education Logo"
/>
```

---

## 📞 Need Help?

Check the component files:
- `components/Logo.tsx` - Logo component
- `components/IntroScreen.tsx` - Welcome screen

Or see: `public/images/README.md` for detailed instructions.

