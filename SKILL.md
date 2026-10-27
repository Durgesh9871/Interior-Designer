---
name: idc-architects-premium-site
description: Build a mobile-first premium architecture and interior design marketing website with cinematic but restrained Three.js/GSAP motion.
---

# IDC Architects Site Build Rules

## Goal

Create an editorial architecture website that makes a visitor want to enquire. Motion must clarify craft, materiality and process—never merely decorate the page.

## Recommended stack

- Next.js + TypeScript
- Tailwind CSS or this kit's `style.css` variables
- GSAP + ScrollTrigger for page and scroll choreography
- Lenis only if it does not create accessibility or mobile-scroll issues
- Three.js / React Three Fiber only for one lightweight, optional desktop-only detail scene
- HTML `<video>` for the supplied hero film; do not recreate that film in WebGL

## Non-negotiable visual rules

- Treat images as art direction, not decoration: generous crops, large calm surfaces, minimal copy.
- Palette: basalt charcoal, limestone ivory, aged brass, deep ink, soft terracotta accent.
- Type pairing: a high-contrast editorial serif for headlines and a calm modern sans for details.
- Avoid generic gradients, glassmorphism cards, neon, oversized rounded corners, stock-office images, and excessive UI chrome.
- Make every navigation and CTA state obvious on touch devices.

## Motion rules

1. Use transforms and opacity for 90% of animation. Never animate layout properties while scrolling.
2. Desktop: `scrub` only for visual details that benefit from scroll linkage; use subtle distances and long easing.
3. Mobile: replace complex parallax/3D with a 10–18px reveal and opacity change. Preserve the feeling, not every effect.
4. Respect `prefers-reduced-motion`: remove smooth scrolling, video autoplay, pinned scenes, parallax and nonessential animations.
5. Clean up every GSAP context, ScrollTrigger and WebGL renderer on unmount.
6. Never pin a content section so long that it feels stuck or blocks normal scrolling.

## Three.js rules

- Optional and only used for one abstract material-study object or exploded floor-plan detail.
- Use glTF/GLB with Draco/KTX2 compression, baked lights, low-poly geometry, max 1–2K texture maps.
- Lazy load after hero interaction/idle time; never block LCP.
- Do not load Three.js at all on low-power/mobile breakpoints. Use a motion poster instead.
- Cap DPR at 1.5 and stop render loop when canvas is outside viewport.

## GSAP / ScrollTrigger pattern

```ts
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('[data-reveal]', {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-reveal-group]', start: 'top 80%' }
    });
  }, scope);
  return () => ctx.revert();
}, []);
```

## Required pages

1. **Home** — cinematic hero, point of view, selected work, services, process, CTA.
2. **Projects** — full-bleed project gallery, filters, individual project stories, enquiry CTA.
3. **Studio / Contact** — philosophy, founder/studio image, enquiry form, WhatsApp, address/map and FAQ.

## Conversion requirements

- Persistent but discreet `Start a Project` / WhatsApp CTA on mobile.
- Form fields: name, phone, email, property type, location, approximate budget, project brief.
- Project cards must lead to either a detailed case-study modal/page or direct consultation CTA.
- Never invent awards, testimonials, project counts, pricing, addresses, or credentials.

## Performance acceptance criteria

- Optimized AVIF/WebP images, explicit dimensions, lazy loaded below the fold.
- Hero poster preloaded; video must not block first render.
- No horizontal overflow at 320px.
- Text and buttons pass contrast and touch-target checks.
- Test on an actual mid-range Android device before client approval.
