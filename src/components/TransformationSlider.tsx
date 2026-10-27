'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeftRight, Sparkles, Layers } from 'lucide-react';

export default function TransformationSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f2ece4] border-y border-black/[0.06]" aria-labelledby="transformation-heading">
      <div className="idc-shell">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="badge-pill mx-auto">
            <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Before & After Transformation</span>
          </div>
          <h2 id="transformation-heading" className="font-display text-2xl sm:text-4xl text-[#17181a] font-normal leading-tight">
            Before & After: The Power of Interior Architecture
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#5e6268] leading-relaxed">
            Drag the interactive slider to see how raw bare-shells transform into calm, handcrafted luxury living sanctuaries with IDC Architects.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[4/3] sm:aspect-[21/9] max-h-[580px] w-full rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-black/10"
        >
          {/* Base Layer: Finished Sanctuary (Right Side) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/projects/interior_living_sanctuary.jpg"
              alt="After IDC - Realized Luxury Interior Living Sanctuary"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-black/80 backdrop-blur-md text-white text-[10px] sm:text-xs px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-mono flex items-center gap-1.5 sm:gap-2 border border-white/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="hidden sm:inline">AFTER IDC: DELIVERED LUXURY SANCTUARY</span>
              <span className="sm:hidden font-semibold">AFTER IDC</span>
            </div>
          </div>

          {/* Clipped Layer: Exterior Structure / Bare Shell (Left Side) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src="/images/projects/luxury_residence_exterior.jpg"
              alt="Before IDC - Raw Architectural Massing and Shell"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-black/80 backdrop-blur-md text-white text-[10px] sm:text-xs px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-mono flex items-center gap-1.5 sm:gap-2 border border-white/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c5a059] shrink-0" />
              <span className="hidden sm:inline">BEFORE IDC: RAW SHELL</span>
              <span className="sm:hidden font-semibold">BEFORE IDC</span>
            </div>
          </div>

          {/* Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#17181a] shadow-xl flex items-center justify-center border-2 border-[#c5a059]">
              <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059]" />
            </div>
          </div>
        </div>

        {/* Caption Footnote */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5e6268] gap-3">
          <span>DRAG THE DIVIDER ACROSS SPATIAL THRESHOLDS</span>
          <span className="font-mono text-[#17181a]/70">TURNKEY ARCHITECTURAL DELIVERY IN BENGALURU</span>
        </div>
      </div>
    </section>
  );
}
