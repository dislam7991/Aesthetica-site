
# Aesthetica Fitness Coaching

A modern, responsive fitness coaching website built with Next.js and Tailwind CSS.

## Features

- Modern dark theme design with gradient backgrounds
- Responsive layout optimized for all devices
- Interactive consultation form with form validation
- Program showcase with Stripe checkout integration
- Smooth scrolling navigation
- TypeScript support for type safety
- Custom UI components built with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Payments:** Stripe Checkout
- **Scheduling:** Calendly integration

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Install required icons:
   \`\`\`bash
   npm install lucide-react
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- \`src/app/page.tsx\` - Main landing page component
- \`src/app/layout.tsx\` - Root layout with global styles
- \`src/app/globals.css\` - Global CSS styles
- \`public/\` - Static assets

## Deployment

This project can be easily deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any platform supporting Node.js

## Configuration

Update the following constants in \`page.tsx\`:
- \`STRIPE\` - Your Stripe checkout URLs
- \`CALENDLY\` - Your Calendly scheduling link