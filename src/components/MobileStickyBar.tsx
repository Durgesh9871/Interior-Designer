'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // On homepage, do NOT show sticky bar while user is inside the Hero section (300vh scroll scrubber)
      // Only reveal sticky bar once user scrolls past the hero into Trust Metrics & below
      const threshold = isHome ? window.innerHeight * 2.1 : 250;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-black/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-transform duration-300 ease-in-out shadow-[0_-8px_25px_rgba(0,0,0,0.08)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      aria-label="Quick Mobile Actions"
    >
      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="btn-primary flex-1 py-2.5 text-xs font-semibold text-center"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-md shrink-0"
          aria-label="Direct WhatsApp Message"
        >
          <MessageCircle className="w-5 h-5 text-emerald-300" />
        </a>
      </div>
    </div>
  );
}
