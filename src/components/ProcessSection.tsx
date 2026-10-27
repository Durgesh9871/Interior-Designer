'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/data/siteConfig';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through this section
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalDist));
      const stepIndex = Math.min(
        siteConfig.process.length - 1,
        Math.floor(progress * siteConfig.process.length)
      );
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="idc-section bg-limestone text-ink border-y border-line"
      aria-labelledby="process-heading"
    >
      <div className="idc-shell">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="idc-eyebrow text-clay">Methodology</span>
              <span className="text-xs uppercase tracking-wider text-ink/50 font-mono">
                [Four-Phase Architecture Cycle]
              </span>
            </div>
            <h2 id="process-heading" className="idc-heading max-w-xl">
              From site orientation to the final joinery screw.
            </h2>
          </div>
          <p className="idc-copy text-sm md:text-base max-w-md">
            Our architectural workflow ensures disciplined transparency at every milestone, safeguarding design integrity throughout construction.
          </p>
        </div>

        {/* Desktop Progress Bar Line */}
        <div className="hidden lg:block pt-8 pb-12">
          <div className="relative w-full h-[2px] bg-ink/15">
            {/* Active filled line */}
            <div
              className="absolute top-0 left-0 h-full bg-clay transition-all duration-500 ease-out"
              style={{
                width: `${((activeStep + 1) / siteConfig.process.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 4 Process Columns / Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {siteConfig.process.map((p, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={p.step}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col justify-between p-6 sm:p-8 bg-paper border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-clay shadow-md -translate-y-1'
                    : 'border-line hover:border-ink/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-line">
                    <span className="font-mono text-xs text-ink/40 font-semibold">
                      PHASE {p.step}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-widest font-semibold ${
                        isActive ? 'text-clay' : 'text-ink/60'
                      }`}
                    >
                      {p.phase}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-ink font-normal mt-6 mb-3">
                    {p.heading}
                  </h3>

                  <p className="text-sm text-ink/75 leading-relaxed font-sans mb-6">
                    {p.summary}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-line/60">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-ink/40 block mb-2">
                    Key Milestones:
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink/80">
                    {p.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-clay font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom editable guidance note */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ink/50 font-mono gap-2 border-t border-line">
          <span>PROGRESS LINE LINKS TO SCROLL ON DESKTOP</span>
          <span>[EDITABLE: Client to review phase timelines and deliverables]</span>
        </div>
      </div>
    </section>
  );
}
