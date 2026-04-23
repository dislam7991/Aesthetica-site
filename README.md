<div align="center">

# 💪 Aesthetica Fitness Coaching

### *Sculpt a powerful, timeless physique.*

A production-ready fitness coaching web application with Stripe payment integration, Calendly scheduling, and cinematic scroll animations — built to convert.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF4080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Icons-F56565?style=for-the-badge)](https://lucide.dev/)

</div>

---

## 🌐 Live Demo

> **[Live Demo](https://your-deployment-url.com)** — Replace this with your Vercel or Netlify deployment URL.

---

## 📸 Screenshots

> **Add screenshots or a GIF walkthrough here.**
>
> Suggested steps:
> 1. Run the app locally (`npm run dev`)
> 2. Take screenshots of the hero, programs, and consultation sections
> 3. Drop the images into a `/public/screenshots/` folder and reference them below
>
> ```md
> ![Hero Section](public/screenshots/hero.png)
> ![Programs Section](public/screenshots/programs.png)
> ![Consultation Form](public/screenshots/consult.png)
> ```

---

## ✨ Features

- **🎨 Cinematic Dark UI** — Slate-950 base with radial gradient glows, glassmorphism cards, and a smooth scroll progress indicator
- **🏋️ Program Catalog with Stripe Checkout** — Four training programs (Foundations $79, Elite $99, Power-Cut $89, Ramadan Arc free) with live Stripe hosted payment links
- **📅 Calendly Booking Integration** — One-click 1:1 coaching consultation scheduling embedded directly in the conversion flow
- **📝 Netlify Forms Lead Capture** — Consultation form with client-side validation, success state, and fallback Calendly CTA
- **⚡ Framer Motion Animations** — Staggered fade-up reveals, blur-in transitions, and magnetic button physics on every CTA
- **🎯 GSAP ScrollTrigger** — Scroll-scrubbed physique anatomy section with animated SVG callout annotations
- **📱 Fully Responsive** — Mobile-first layout that adapts from 320 px to wide-screen desktop
- **♿ Accessibility-Aware** — Respects `prefers-reduced-motion`; all animations degrade gracefully
- **🖼️ Physique Gallery** — Hover-zoom image grid with smooth scale transitions
- **💬 Client Testimonials** — Results cards with real stats and quotes
- **❓ FAQ Accordion** — Collapsible Q&A section covering common objections
- **🧭 Sticky Navigation** — Backdrop-blur header with smooth-scroll anchors and a mobile consult CTA
- **🔒 Type-Safe** — 100% TypeScript with strict types throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, `"use client"`) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) + [GSAP 3 / ScrollTrigger](https://greensock.com/scrolltrigger/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Payments | [Stripe Checkout](https://stripe.com/docs/payments/checkout) (hosted payment links) |
| Scheduling | [Calendly](https://calendly.com/) |
| Forms | [Netlify Forms](https://www.netlify.com/products/forms/) |
| Fonts | [Geist Sans + Geist Mono](https://vercel.com/font) via `next/font` |
| Deployment | [Netlify](https://netlify.com/) / [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dislam7991/Aesthetica-site.git
cd Aesthetica-site

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

This project uses **inline configuration constants** in `src/app/page.tsx` rather than a `.env` file. To connect your own Stripe and Calendly accounts, update the following constants at the top of that file:

```ts
// src/app/page.tsx

const STRIPE = {
  FOUNDATIONS: "https://buy.stripe.com/<your-link>",  // Beginner/Intermediate program ($79)
  ELITE:        "https://buy.stripe.com/<your-link>",  // Advanced program ($99)
  POWERCUT:     "https://buy.stripe.com/<your-link>",  // Transformation program ($89)
};

const CALENDLY = "https://calendly.com/<your-handle>/<event-slug>";
```

> **Tip:** You can migrate these to environment variables by creating a `.env.local` file and prefixing them with `NEXT_PUBLIC_` for client-side access.

---

## 🗂️ Project Structure

```
Aesthetica-site/
├── public/
│   ├── logo.png                   # Brand logo (navbar + OG image)
│   └── physique/
│       ├── bg-hero.jpg            # Hero section background
│       ├── bg-coaching.jpg        # Coaching section background
│       ├── pose-1.jpg             # Gallery images
│       ├── pose-2.jpg
│       └── pose-3.jpg
├── src/
│   └── app/
│       ├── layout.tsx             # Root layout — fonts, metadata, Open Graph tags
│       ├── page.tsx               # Full landing page (single-page app)
│       └── globals.css            # Global base styles
├── netlify.toml                   # Netlify build + publish config
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # PostCSS / Tailwind CSS config
├── tsconfig.json                  # TypeScript config
└── package.json
```

---

## 🚢 Deployment

### Netlify (configured)

A `netlify.toml` is already included. Push to GitHub and connect the repo in the [Netlify dashboard](https://app.netlify.com/):

```toml
[build]
  command = "npm run build"
  publish = "out"
```

### Vercel (recommended for Next.js)

```bash
npm i -g vercel
vercel
```

Vercel auto-detects Next.js — no additional configuration needed.

> After deploying, update the `url` field in `src/app/layout.tsx` under `openGraph` with your production domain.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Daniel Islam](https://github.com/dislam7991)

</div>
