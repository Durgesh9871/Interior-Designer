'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { Calculator, ArrowUpRight, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function CostEstimator() {
  const [projectTypology, setProjectTypology] = useState<'villa' | 'penthouse' | 'commercial'>('villa');
  const [builtUpArea, setBuiltUpArea] = useState<number>(4500);
  const [finishGrade, setFinishGrade] = useState<'refined' | 'bespoke' | 'monumental'>('bespoke');

  const calculation = useMemo(() => {
    let ratePerSqFt = 4500;
    let timelineMonths = 14;

    if (projectTypology === 'villa') {
      ratePerSqFt = finishGrade === 'refined' ? 4200 : finishGrade === 'bespoke' ? 5800 : 7500;
      timelineMonths = builtUpArea > 5000 ? 18 : 14;
    } else if (projectTypology === 'penthouse') {
      ratePerSqFt = finishGrade === 'refined' ? 3200 : finishGrade === 'bespoke' ? 4600 : 6200;
      timelineMonths = 8;
    } else {
      ratePerSqFt = finishGrade === 'refined' ? 3000 : finishGrade === 'bespoke' ? 4200 : 5500;
      timelineMonths = 6;
    }

    const totalEstLakhs = Math.round((builtUpArea * ratePerSqFt) / 100000);
    const totalCr = (totalEstLakhs / 100).toFixed(2);

    return {
      ratePerSqFt,
      totalCr,
      timelineMonths,
    };
  }, [projectTypology, builtUpArea, finishGrade]);

  const generateWhatsAppInquiry = () => {
    const text = `*Architectural Feasibility Inquiry*\nTypology: ${projectTypology.toUpperCase()}\nArea: ${builtUpArea} sq.ft.\nFinish Tier: ${finishGrade.toUpperCase()}\nEstimated Range: ₹${calculation.totalCr} Cr\nTimeline: ~${calculation.timelineMonths} months\n\nI would like to schedule a feasibility review with IDC Architects.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-10 lg:p-12 card-shadow border border-black/[0.06] text-[#17181a]">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="badge-pill mx-auto">
            <Calculator className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Interactive Project Budget & Cost Estimator</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl text-[#17181a] font-normal leading-tight">
            Estimate Your Project Budget & Construction Cost
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#5e6268] max-w-xl mx-auto leading-relaxed">
            Estimate the overall turnkey budget for your luxury villa, penthouse interior, or commercial studio in Bengaluru — encompassing architectural design, structure, premium interiors, and landscape.
          </p>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* 1. Typology */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-[#17181a]/70 font-semibold block">
              1. Project Typology
            </label>
            <div className="space-y-2">
              {[
                { id: 'villa', label: 'Bespoke Luxury Villa', desc: 'Architecture + Interiors' },
                { id: 'penthouse', label: 'Penthouse / Apartment', desc: 'Turnkey Interior Architecture' },
                { id: 'commercial', label: 'Boutique Workspace', desc: 'Commercial Office / Studio' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectTypology(item.id as any)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    projectTypology === item.id
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#17181a] shadow-sm'
                      : 'border-black/10 bg-[#fbf9f5] text-[#5e6268] hover:border-black/20'
                  }`}
                >
                  <span className="font-body text-sm block font-semibold text-[#17181a]">{item.label}</span>
                  <span className="text-[11px] text-[#5e6268]">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Built-up Area Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-widest text-[#17181a]/70 font-semibold">
                2. Built-up Area
              </label>
              <span className="font-mono text-[#c5a059] text-sm font-bold bg-[#c5a059]/10 px-2.5 py-0.5 rounded-full">
                {builtUpArea.toLocaleString()} SQ.FT.
              </span>
            </div>
            <div className="p-4 bg-[#fbf9f5] rounded-xl border border-black/10 space-y-4">
              <input
                type="range"
                min={1500}
                max={12000}
                step={250}
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer h-2 bg-black/15 rounded-full"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5e6268]">
                <span>1,500 sq.ft.</span>
                <span>6,000 sq.ft.</span>
                <span>12,000+ sq.ft.</span>
              </div>
              <p className="text-xs text-[#5e6268] leading-relaxed">
                Includes internal living suites, shaded courtyards, verandahs, and reflection pools.
              </p>
            </div>
          </div>

          {/* 3. Finish & Detailing Grade */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-[#17181a]/70 font-semibold block">
              3. Detailing Tier
            </label>
            <div className="space-y-2">
              {[
                { id: 'refined', label: 'Refined Contemporary', rate: '₹3,500 – 4,500/sq.ft' },
                { id: 'bespoke', label: 'Bespoke Quiet Luxury', rate: '₹4,500 – 6,000/sq.ft' },
                { id: 'monumental', label: 'Monumental High-Ticket', rate: '₹6,000 – 8,000+/sq.ft' },
              ].map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setFinishGrade(grade.id as any)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    finishGrade === grade.id
                      ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#17181a] shadow-sm'
                      : 'border-black/10 bg-[#fbf9f5] text-[#5e6268] hover:border-black/20'
                  }`}
                >
                  <span className="font-body text-sm block font-semibold text-[#17181a]">{grade.label}</span>
                  <span className="text-[11px] text-[#c5a059] font-mono">{grade.rate}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Card */}
        <div className="p-5 sm:p-8 bg-[#17181a] text-white rounded-2xl shadow-xl border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-1">
                Estimated Project Budget (Turnkey)
              </span>
              <div className="font-display text-2xl sm:text-4xl text-white font-medium">
                ₹{calculation.totalCr} <span className="text-base sm:text-lg text-[#c5a059] font-sans">Crores</span>
              </div>
              <span className="text-[11px] text-white/40 font-mono">
                ~₹{calculation.ratePerSqFt.toLocaleString()} per sq.ft. benchmark
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-1">
                Estimated Realisation Period
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#c5a059]" />
                <span className="font-display text-2xl sm:text-3xl text-white">
                  {calculation.timelineMonths} Months
                </span>
              </div>
              <span className="text-[11px] text-white/40 font-mono">
                Design (3 mos) + Turnkey Execution ({calculation.timelineMonths - 3} mos)
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppInquiry()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#1b4d3e] text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Verify on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="btn-primary text-xs py-3 w-full flex items-center justify-center"
              >
                <span>Book Full Discovery Call</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Foreign Client & NRI Reassurance */}
        <div className="border-t border-black/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5e6268] gap-4">
          <div className="flex items-center gap-2 text-[#1b4d3e] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>OVERSEAS CLIENTS: Turnkey milestone billing & bi-weekly site video audits included</span>
          </div>
          <span className="font-mono text-[#17181a]/70">Studio Office: {siteConfig.formattedPhone}</span>
        </div>
      </div>
    </div>
  );
}
