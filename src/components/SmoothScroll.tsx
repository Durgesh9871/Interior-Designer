'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // In reduced motion mode or touch mobile, standard native scroll is preferred for accessibility
    if (prefersReducedMotion || isMobile) {
      // Still initialize GSAP triggers with standard scroll
      const revealElements = document.querySelectorAll('[data-reveal]');
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    // Initialize Lenis smooth scroll on desktop
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Initialise GSAP global data-reveal animations as per SKILL.md
    const ctx = gsap.context(() => {
      const groups = document.querySelectorAll('[data-reveal-group]');
      if (groups.length > 0) {
        groups.forEach((group) => {
          const items = group.querySelectorAll('[data-reveal]');
          gsap.from(items, {
            y: 22,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
            },
          });
        });
      }

      // Standalone reveal items
      const standalone = document.querySelectorAll('[data-reveal]:not([data-reveal-group] [data-reveal])');
      standalone.forEach((item) => {
        gsap.from(item, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
