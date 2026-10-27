'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="idc-section bg-paper" aria-labelledby="capabilities-heading">
      <div className="idc-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="idc-eyebrow text-clay">Discipline & Scope</span>
              <span className="idc-tag-placeholder">
                [Services Pending Final Client Confirmation]
              </span>
            </div>
            <h2 id="capabilities-heading" className="idc-heading max-w-xl">
              Capabilities shaped by context.
            </h2>
          </div>
          <p className="idc-copy text-sm md:text-base max-w-md">
            Every architectural intervention demands a tailored blend of spatial planning, structural rigour, and handcrafted materiality.
          </p>
        </div>

        {/* Numbered Rows List (Not boxed cards) */}
        <div className="divide-y divide-line" role="list">
          {siteConfig.capabilities.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group py-8 sm:py-10 transition-colors duration-300 relative ${
                  isHovered ? 'bg-limestone/40' : 'bg-transparent'
                }`}
                role="listitem"
              >
                {/* Subtle active hairline highlight on left */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-clay transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start px-2 sm:px-4">
                  {/* Number */}
                  <div className="md:col-span-2 flex items-center gap-3">
                    <span className="font-mono text-sm tracking-widest text-ink/40 group-hover:text-clay transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-ink/30 md:hidden">
                      [Service Placeholder]
                    </span>
                  </div>

                  {/* Title & Scope Badges */}
                  <div className="md:col-span-5 space-y-3">
                    <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.scopeList.map((scope, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-line text-ink/70"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description & Action Link */}
                  <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
                    <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-sans">
                      {item.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-clay hover:text-ink transition-colors"
                      >
                        <span>Enquire for this scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote about Client Confirmation */}
        <div className="pt-8 flex items-center justify-between text-xs text-ink/50 font-mono border-t border-line">
          <span>ALL CAPABILITIES DISPLAYED ARE EDITABLE PLACEHOLDERS</span>
          <span>CLIENT TO CONFIRM FORMAL SCOPE BEFORE PUBLIC DEPLOYMENT</span>
        </div>
      </div>
    </section>
  );
}
