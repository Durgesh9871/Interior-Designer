'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { MessageCircle, Phone, Calendar, ArrowUpRight, X, Sparkles, Building2 } from 'lucide-react';

export default function FloatingLeadTrigger() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after modest scroll
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      {isExpanded ? (
        /* Eye-catching, perfectly proportioned Square Box with professional studio advisory text */
        <div className="w-[320px] h-[320px] sm:w-[340px] sm:h-[340px] bg-[#121417]/95 backdrop-blur-xl text-white p-5 rounded-2xl border border-[#c5a059]/40 shadow-2xl flex flex-col justify-between card-dark-shadow animate-fadeIn relative overflow-hidden">
          {/* Subtle gold glow accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] font-semibold">
                Studio Advisory Desk
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Advisory Box"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Middle: Professional Architectural Messaging */}
          <div className="space-y-1.5 relative z-10 my-auto">
            <h4 className="font-display text-lg sm:text-xl text-white leading-snug">
              Discuss Your Plot & Living Vision
            </h4>
            <p className="font-body text-xs text-white/75 leading-relaxed">
              Connect directly with our principal architects for zoning feasibility, solar layout, and bespoke interior budgets in Bengaluru.
            </p>
            <div className="text-[11px] font-mono text-[#c5a059] flex items-center gap-1.5 pt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Response within 24h · 100% Turnkey</span>
            </div>
          </div>

          {/* Bottom Quick-Action Buttons */}
          <div className="space-y-2 relative z-10 pt-2 border-t border-white/10">
            <a
              href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello IDC Architects, I would like to consult with your principal architects regarding a plot / residential project in Bengaluru.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#1b4d3e] text-white hover:bg-emerald-700 flex items-center justify-between transition-colors shadow-sm text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Principal Architect</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="py-2 px-3 rounded-xl bg-white/10 text-white hover:bg-white/15 flex items-center justify-center gap-1.5 border border-white/15 text-xs font-medium transition-colors"
                title="Call Studio Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Call Studio</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setIsExpanded(false)}
                className="py-2 px-3 rounded-xl bg-[#c5a059] text-white hover:bg-[#b08c45] flex items-center justify-center gap-1 text-xs font-semibold transition-colors shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Call</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Highly clickable, eye-catching lead generation trigger pill */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2.5 px-5 py-3 bg-[#121417]/95 backdrop-blur-md text-white border border-[#c5a059]/50 shadow-2xl rounded-full text-xs font-medium tracking-wide hover:bg-[#c5a059] hover:border-[#c5a059] hover:text-white transition-all cursor-pointer group card-shadow"
          aria-label="Talk to Principal Architect"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-body font-semibold text-xs">Talk to Principal Architect</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
