# IDC Architects — Production Website

A bespoke, editorial architecture and interior design web application built for **IDC Architects, Bengaluru**.

---

## 1. Confirmed Studio Information (Truth Rule Compliance)

This codebase strictly adheres to the client truth mandate:
* **Studio Name:** IDC Architects
* **Confirmed Address:** 21/1, IDC Architects, Second Floor, Above Bharat Textiles, S. M. Road, Opp Vaishnavi Rathnam, T Dasarahalli, near Jalahalli Cross Road, Bengaluru, Karnataka, India
* **Confirmed Telephone:** +91 99163 57444
* **Location:** Bengaluru, Karnataka, India

*Note: All case studies, project photography, awards, founder biographies, and services remain labeled as editable client placeholders until formally signed off by IDC Architects.*

---

## 2. Tech Stack

* **Core Framework:** [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
* **Styling & Design System:** Tailwind CSS + custom CSS variables derived from `style.css`
* **Motion & Choreography:** GSAP 3 + ScrollTrigger + Lenis smooth scroll
* **3D Tectonic Visualisation:** Three.js (desktop-only, DPR capped at 1.5, pauses off-screen)
* **Typography:** DM Serif Display & DM Sans (Next.js font optimization)
* **SEO & Metadata:** Schema.org `ArchitecturalService` JSON-LD, OpenGraph, Canonical tags

---

## 3. Quick Start & Setup

### Prerequisites
* Node.js v18.17+ or v20+ / v22+
* npm or pnpm

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Run the local development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

### Production Build
```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```

---

## 4. Master Data & Configuration

All client contact details, project cards, capability labels, and WhatsApp numbers are centralised in:
📁 `src/data/siteConfig.ts`

### Key Variables to Configure Before Launch:
1. **WhatsApp Line:**
   ```ts
   whatsAppNumber: "+919916357444" // Replace if client has a dedicated WhatsApp business number
   ```
2. **Official Enquiry Email:**
   ```ts
   contactEmail: "enquiry@idcarchitects.in" // Replace with verified inbox
   ```
3. **Verified Social Media Handles:**
   ```ts
   socialLinks: {
     instagram: "https://instagram.com/...",
     linkedin: "https://linkedin.com/..."
   }
   ```
4. **Project Cards:**
   Update the `projects` array in `siteConfig.ts` with verified project titles, high-resolution imagery, and photography credits.

---

## 5. Media Replacement Guide

### Hero Film & Images
1. **Google Flow Video:**
   * Generate an MP4/WebM video using the prompt in `01-google-flow-video-prompt.md`.
   * Save the files to:
     * `public/videos/hero.mp4`
     * `public/videos/hero.webm`
   * The `<video>` component in `src/app/page.tsx` will automatically detect and loop this film.
2. **Hero Poster Image:**
   * Replace `public/assets/idc-hero-start.png` with your preferred 1920×1080 arrival photograph.
3. **Interior Spatial Reveal:**
   * Replace `public/assets/idc-hero-end.png` with client-approved interior photography.

---

## 6. Form Provider Configuration

The enquiry form is located in `src/components/ContactForm.tsx`.
It includes:
* Strict client-side validation (Name, Phone, Email, Location, Brief)
* Anti-spam Honeypot field
* WhatsApp direct transmission option

### To connect to an email backend:
* **Formspree:** Replace the submit handler URL with `https://formspree.io/f/{your_form_id}`.
* **Resend / Next.js API Route:** Create `src/app/api/enquiry/route.ts` and dispatch email using Resend or Nodemailer.

---

## 7. Performance & Motion Guidelines

* **Reduced Motion:** Fully conforms to `prefers-reduced-motion: reduce`. Hero video stops autoplay, smooth scrolling is disabled, and animations collapse to instant opacity transitions.
* **Mobile Breakpoint:** WebGL is omitted on screens `< 1024px` and replaced with an optimized static material composition diagram.
* **Zero Horizontal Overflow:** Strict containment with `idc-shell` width constraints.

---

## 8. Deployment

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify or Custom Node VPS
Run `npm run build` and launch with `npm run start` or Docker container.
