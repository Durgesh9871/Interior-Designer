'use client';

import React from 'react';
import { Award, Compass, Sparkles, Star, Building2, CheckCircle2 } from 'lucide-react';

export default function TrustMetricsStrip() {
  const metrics = [
    {
      icon: Building2,
      value: "140+",
      label: "Bespoke Residences & Interiors",
      subtext: "Executed across Bengaluru & South India",
    },
    {
      icon: Compass,
      value: "15+ Years",
      label: "Microclimate Architecture",
      subtext: "Climate-first spatial engineering",
    },
    {
      icon: CheckCircle2,
      value: "100%",
      label: "Turnkey Site Fidelity",
      subtext: "Exact match to photorealistic 3D renders",
    },
    {
      icon: Star,
      value: "4.9 / 5.0",
      label: "Client Satisfaction",
      subtext: "Over 40% international & NRI commissions",
    },
  ];

  return (
    <div className="relative -mt-6 sm:-mt-10 z-20 idc-shell">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 card-shadow border border-black/[0.06]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:divide-x divide-black/[0.06]">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`flex items-start gap-2.5 sm:gap-4 ${idx > 0 ? 'sm:pl-6' : ''}`}>
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center shrink-0 border border-[#c5a059]/20 shadow-sm mt-0.5">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-[#17181a] leading-none">
                    {item.value}
                  </div>
                  <div className="font-body text-[11px] sm:text-xs font-semibold text-[#17181a]/90 mt-1 line-clamp-1 sm:line-clamp-none">
                    {item.label}
                  </div>
                  <div className="font-body text-[10px] sm:text-[11px] text-[#5e6268] mt-0.5 leading-tight line-clamp-2 sm:line-clamp-none">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
