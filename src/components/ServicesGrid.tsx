'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { Home, Sparkles, Trees, RefreshCw, PenTool, ClipboardCheck, ArrowUpRight } from 'lucide-react';

export default function ServicesGrid() {
  const serviceIcons = [Home, Sparkles, Trees, RefreshCw, PenTool, ClipboardCheck];

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5] border-t border-black/[0.06]" aria-labelledby="services-heading">
      <div className="idc-shell">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="badge-pill mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Comprehensive Architectural Scope</span>
          </div>
          <h2 id="services-heading" className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
            Architectural Disciplines & Interior Detailing
          </h2>
          <p className="font-body text-xs sm:text-base text-[#5e6268] leading-relaxed">
            From greenfield land feasibility in North Bengaluru to turnkey penthouse interiors in Koramangala.
          </p>
        </div>

        {/* 6 High-End Service Cards with Box Shadows & Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.capabilities.map((item, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <div
                key={item.number}
                className="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-black/[0.06] flex flex-col justify-between space-y-6 group cursor-pointer"
              >
                <div className="space-y-4 sm:space-y-5">
                  {/* Top Bar with Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center border border-[#c5a059]/20 group-hover:bg-[#c5a059] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#17181a]/40 group-hover:text-[#c5a059] transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-[#17181a] font-medium leading-snug group-hover:text-[#c5a059] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#5e6268] mt-2.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Scope Badges Animated Continuous Marquee (Left to Right) */}
                  <div className="relative overflow-hidden w-full pt-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                    <div className="animate-marquee-ltr flex items-center gap-2 py-0.5">
                      {[...item.scopeList, ...item.scopeList].map((scope, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#f3efea] text-[#17181a]/85 border border-black/[0.04] shrink-0 whitespace-nowrap shadow-xs"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-[#17181a]">
                  <span className="text-[#c5a059] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Initiate Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-[#5e6268] font-mono">TURNKEY BENGALURU</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 sm:mt-16 bg-[#17181a] text-white rounded-2xl p-6 sm:p-10 card-dark-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              Custom Project Commission
            </span>
            <h4 className="font-display text-xl sm:text-3xl text-white font-normal leading-snug">
              Have a plot or structural shell in Bengaluru?
            </h4>
            <p className="text-xs sm:text-sm text-white/70">
              Schedule a 45-minute discovery consultation with our principal architects to evaluate solar path, zoning, and budget feasibility.
            </p>
          </div>
          <Link href="/contact" className="btn-primary text-xs py-3 px-6 w-full sm:w-auto text-center justify-center shrink-0">
            <span>Schedule Discovery Meeting</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
