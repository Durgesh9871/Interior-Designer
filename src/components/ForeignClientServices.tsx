'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { Globe, Video, Box, FileCheck, ArrowUpRight, MessageCircle, Star, ShieldCheck } from 'lucide-react';

export default function ForeignClientServices() {
  const icons = [Video, Globe, Box, FileCheck];

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5] border-t border-black/[0.06]" aria-labelledby="foreign-clients-heading">
      <div className="idc-shell">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="badge-pill">
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>International & NRI Practice</span>
            </div>
            <h2 id="foreign-clients-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
              Building in Bengaluru from anywhere in the world.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#5e6268] max-w-xl">
              Over 40% of our architectural commissions are commissioned by overseas patrons, NRI families, and global design collectors requiring flawless local execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-pill bg-white shadow-sm border border-black/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Turnkey Remote Custodianship</span>
            </span>
          </div>
        </div>

        {/* 4 Turnkey Assurance Pillars with Box Shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {siteConfig.foreignClientAssurance.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 card-shadow border border-black/[0.06] flex flex-col justify-between space-y-6 group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center border border-[#c5a059]/20 group-hover:bg-[#c5a059] group-hover:text-white transition-all shadow-sm mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-2xl text-[#17181a] font-medium leading-snug group-hover:text-[#c5a059] transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#5e6268] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] text-[10px] font-mono text-[#c5a059] font-bold">
                  PILLAR 0{idx + 1} · REMOTE FIDELITY
                </div>
              </div>
            );
          })}
        </div>

        {/* Overseas Discovery CTA Banner */}
        <div className="mt-16 bg-[#17181a] text-white rounded-2xl p-8 sm:p-10 card-dark-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              Overseas Project Discovery
            </span>
            <h4 className="font-display text-2xl sm:text-3xl text-white font-normal">
              Schedule a Virtual Consultation via Google Meet / Zoom
            </h4>
            <p className="text-xs sm:text-sm text-white/70">
              We coordinate across US, UK, Europe, UAE, and Singapore timezones for international clients.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-xs py-3 px-6">
              <span>Book Video Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
