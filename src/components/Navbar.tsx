'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Menu, X, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // On homepage, remain dark & cinematic throughout the entire 300vh Hero scroll scrubber
      const threshold = isHome ? window.innerHeight * 2.1 : 30;
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isDarkOverHero = !isScrolled && isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#ffffff]/90 backdrop-blur-md text-[#17181a] border-b border-black/[0.06] shadow-sm py-3.5'
            : isDarkOverHero
            ? 'bg-gradient-to-b from-black/60 to-transparent text-white py-5'
            : 'bg-[#ffffff]/80 backdrop-blur-md text-[#17181a] border-b border-black/[0.06] py-4'
        }`}
      >
        <div className="idc-shell flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none"
            aria-label="IDC Architects Home"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase leading-none">
                {siteConfig.brandName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            </div>
            <span
              className={`text-[0.6rem] font-body tracking-[0.22em] uppercase mt-1 font-medium transition-colors ${
                isDarkOverHero ? 'text-white/60' : 'text-[#17181a]/55'
              }`}
            >
              Architecture & Interiors · Bengaluru
            </span>
          </Link>

          {/* Right-Aligned Navigation & Action Buttons */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links Aligned to the Right, directly beside the button */}
            <nav className="flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              <Link
                href="/projects"
                className={`text-[0.82rem] font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-[#c5a059] ${
                  pathname === '/projects'
                    ? 'text-[#c5a059] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a059] after:rounded-full'
                    : isDarkOverHero
                    ? 'text-white/85'
                    : 'text-[#17181a]/80'
                }`}
              >
                Portfolio
              </Link>

              <Link
                href="/studio"
                className={`text-[0.82rem] font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-[#c5a059] ${
                  pathname === '/studio'
                    ? 'text-[#c5a059] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a059] after:rounded-full'
                    : isDarkOverHero
                    ? 'text-white/85'
                    : 'text-[#17181a]/80'
                }`}
              >
                Studio & Philosophy
              </Link>

              <Link
                href="/contact"
                className={`text-[0.82rem] font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-[#c5a059] ${
                  pathname === '/contact'
                    ? 'text-[#c5a059] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#c5a059] after:rounded-full'
                    : isDarkOverHero
                    ? 'text-white/85'
                    : 'text-[#17181a]/80'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Direct Studio Phone & Rounded CTA Button */}
            <div className="flex items-center gap-3 pl-2 border-l border-current/15">
              <a
                href={`tel:${siteConfig.phone}`}
                className={`hidden lg:flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                  isDarkOverHero
                    ? 'border-white/20 text-white/80 hover:bg-white/10'
                    : 'border-black/10 text-[#17181a]/70 hover:bg-black/5'
                }`}
                title="Call Studio Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>+91 99163 57444</span>
              </a>

              <Link
                href="/contact"
                className="btn-primary text-xs py-2.5 px-5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
              isDarkOverHero ? 'text-white hover:bg-white/10' : 'text-[#17181a] hover:bg-black/5'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#0f1113] text-white flex flex-col justify-between p-6 sm:p-8 pt-24 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-6 mt-6">
          <span className="badge-pill-dark self-start">Navigation</span>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl hover:text-[#c5a059] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>Home</span>
              <ArrowUpRight className="w-5 h-5 text-white/40" />
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl hover:text-[#c5a059] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-5 h-5 text-white/40" />
            </Link>
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl hover:text-[#c5a059] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>Studio & Philosophy</span>
              <ArrowUpRight className="w-5 h-5 text-white/40" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl hover:text-[#c5a059] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-5 h-5 text-white/40" />
            </Link>
          </nav>
        </div>

        {/* Mobile Quick Contacts */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1 text-xs text-white/70">
            <span className="text-white/40 uppercase tracking-widest text-[0.62rem]">Studio Location</span>
            <p className="line-clamp-2 leading-relaxed text-white/80">
              {siteConfig.address.fullAddress}
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary flex-1 text-xs py-3"
            >
              <span>Start a Project</span>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center border border-emerald-500/30 hover:bg-emerald-700 transition-colors shrink-0"
              aria-label="WhatsApp Enquiry"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
