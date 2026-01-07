# Garage Cowboy Homepage

A fully responsive, production-ready homepage for Garage Cowboy - a garage door repair and services company serving North Texas. Built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System

- **Primary Color:** `#fec300` (Yellow)
- **Dark Color:** `#35363a` / `#323232`
- **Typography:** Product Sans (Regular, Bold, Black, Medium, Light, Italic)
- **Responsive Breakpoints:**
  - Mobile: 390px
  - Tablet: 768px
  - Desktop: 1440px+

## ✨ Features

### Completed Sections
- ✅ **Header** - Logo, emergency service badge, phone number with responsive layout
- ✅ **Hero Section** - Full-width background image with call-to-action
- ✅ **Services Grid** - 8 service cards with images, titles, descriptions, and "Read More" links
- ✅ **Service Areas** - Texas state map with city markers and service area listing
- ✅ **FAQ Section** - Accordion-style questions and answers
- ✅ **Contact Form** - Multi-column form with validation and toast notifications
- ✅ **Testimonials** - Auto-rotating carousel with 8 customer reviews (5-second intervals)
- ✅ **Footer** - Company info, service hours, social links, and legal information

### Interactive Features
- Form submission with validation
- FAQ accordion toggle
- Automatic testimonial carousel (with manual navigation)
- Hover states on buttons and cards
- Responsive navigation
- Toast notifications for form feedback

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Product Sans** - Custom font family

## 📁 Project Structure

```
garage-cowboy/
├── src/
│   ├── App.tsx                          # Main entry point
│   ├── components/
│   │   ├── Header.tsx                   # Site header with logo and contact
│   │   ├── HeroSection.tsx              # Hero with background image
│   │   ├── Group47927.tsx               # Logo title component
│   │   ├── GarageDoorRepair.tsx         # Services grid (8 cards)
│   │   ├── ServiceAreasSection.tsx      # Service areas with map
│   │   ├── FAQSection.tsx               # Accordion FAQs
│   │   ├── FormFiller.tsx               # Contact form + testimonials
│   │   └── Footer.tsx                   # Site footer
│   ├── imports/
│   │   ├── svg-*.ts                     # SVG icon paths
│   │   └── (Figma imported components)
│   ├── styles/
│   │   └── globals.css                  # Global styles and typography
│   └── main.tsx                         # React entry point
├── public/
│   └── fonts/                           # Product Sans font files
├── Guidelines.md                        # Design implementation guidelines
└── README.md                            # This file
```

## 🚀 Setup Instructions

### 1. Create New Project

```bash
npm create vite@latest garage-cowboy -- --template react-ts
cd garage-cowboy
```

### 2. Install Dependencies

```bash
npm install
npm install lucide-react sonner@2.0.3
npm install -D tailwindcss@next @tailwindcss/vite@next
```

### 3. Configure Vite

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 4. Copy Project Files

Copy all files from Figma Make to your new project:

- `/src/App.tsx`
- `/src/components/` (all component files)
- `/src/styles/globals.css`
- `/src/imports/` (all imported assets)

### 5. Handle Figma Assets

**Important:** Figma Make uses a special `figma:asset` import syntax that won't work in Cursor. You need to:

1. **Export all images** from the Figma Make preview
2. **Place them in** `/public/images/` or `/src/assets/`
3. **Find and replace** all `figma:asset` imports:

```typescript
// FROM (Figma Make):
import img from "figma:asset/abc123.png"

// TO (Standard):
import img from "/images/abc123.png"
// or
import img from "../assets/abc123.png"
```

**Files with figma:asset imports:**
- `Header.tsx`
- `HeroSection.tsx`
- `GarageDoorRepair.tsx`
- `Group47927.tsx`
- `ServiceAreasSection.tsx`
- `FormFiller.tsx`
- All files in `/imports/` directory

### 6. Add Product Sans Fonts

Product Sans is a proprietary Google font. You have three options:

**Option A: Use Product Sans (if you have license)**
1. Place font files in `/public/fonts/`
2. The font-face declarations are already in `/styles/globals.css`

**Option B: Use a similar font**
Replace with **Google Sans**, **Montserrat**, or **Poppins**:

```css
/* In globals.css, replace all font-['Product_Sans:*'] with: */
font-family: 'Montserrat', product-sans;
```

**Option C: Use system fonts**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', product-sans;
```

### 7. Update main.tsx

Make sure your `main.tsx` imports the global styles:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 🏃 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Important Notes

### Assets Migration Checklist

- [ ] Export all images from Figma Make
- [ ] Replace all `figma:asset` imports with local paths
- [ ] Add Product Sans fonts (or choose alternative)
- [ ] Test all images load correctly
- [ ] Verify SVG icons render properly
- [ ] Test responsive layouts on all breakpoints

### Font Files Needed

If using Product Sans, you need these font files:
- `ProductSans-Regular.ttf`
- `ProductSans-Bold.ttf`
- `ProductSans-Black.ttf`
- `ProductSans-Medium.ttf`
- `ProductSans-Light.ttf`
- `ProductSans-Italic.ttf`

### Component Dependencies

The project uses:
- `lucide-react` for icons (ChevronDown, MapPin, etc.)
- `sonner@2.0.3` for toast notifications
- Custom SVG paths imported from `/imports/svg-*.ts` files

## 🎯 Features to Implement Post-Export

These features are frontend-only and can be enhanced:

1. **Form Submission** - Currently shows success toast; connect to backend/email service
2. **Service Links** - "Read More" buttons log to console; add routing or modals
3. **Phone Numbers** - Update with real contact numbers
4. **External Links** - Add actual social media and review site URLs
5. **Analytics** - Add Google Analytics or tracking
6. **SEO** - Add meta tags, Open Graph, structured data

## 🔧 Customization

### Update Colors

Edit `/styles/globals.css`:
```css
--color-primary: #fec300;      /* Yellow brand color */
--color-dark: #35363a;         /* Dark gray */
```

### Update Content

- **Phone Number:** Search for `(817) 256-0122` and replace
- **Service Areas:** Edit `ServiceAreasSection.tsx`
- **FAQs:** Edit `faqData` array in `FAQSection.tsx`
- **Testimonials:** Edit `testimonials` array in `FormFiller.tsx`

### Adjust Carousel Speed

In `FormFiller.tsx`, change the interval (currently 5000ms = 5 seconds):
```typescript
const interval = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % testimonials.length);
}, 5000); // Change this value
```

## 🐛 Troubleshooting

### Images not loading
- Verify all `figma:asset` imports have been replaced
- Check image paths are correct relative to component location
- Ensure images exist in `/public/` or `/src/assets/`

### Fonts not rendering
- Check font files are in `/public/fonts/`
- Verify font-face declarations in `globals.css`
- Check browser console for 404 errors on font files

### Tailwind classes not working
- Ensure `@tailwindcss/vite` plugin is in `vite.config.ts`
- Check `globals.css` is imported in `main.tsx`
- Clear cache and restart dev server

### TypeScript errors
- Ensure all imports have correct file extensions (`.tsx`, `.ts`)
- Check all asset imports are typed correctly
- Run `npm install` to ensure all dependencies are installed

## 📱 Responsive Behavior

- **Mobile (< 768px):** Single column layout, stacked navigation
- **Tablet (768px - 1024px):** Two-column services grid, condensed header
- **Desktop (1024px+):** Full four-column services grid, expanded layout

## 🚢 Deployment

The project can be deployed to:
- **Vercel:** `vercel --prod`
- **Netlify:** Drag & drop `dist` folder after `npm run build`
- **GitHub Pages:** Use `gh-pages` package
- **Any static host:** Upload `dist` folder after build

### Build Command
```bash
npm run build
```

Output will be in `/dist` directory.

## 📄 License

This project was created for Garage Cowboy. All rights reserved.

## 🙋 Support

For questions or issues with the codebase, refer to:
- `Guidelines.md` - Original Figma implementation guidelines
- Component comments in each `.tsx` file
- Tailwind CSS v4 documentation

---

**Last Updated:** December 29, 2024
**Built with:** Figma Make → Cursor Export
**Framework:** React 18 + TypeScript + Tailwind CSS v4
