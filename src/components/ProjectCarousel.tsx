'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, ProjectItem } from '@/data/siteConfig';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

interface ProjectCarouselProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectCarousel({ onSelectProject }: ProjectCarouselProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Residential' | 'Interiors' | 'Commercial'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return siteConfig.projects;
    return siteConfig.projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const totalSlides = filteredProjects.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Automatic slide progression every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5]" aria-labelledby="featured-carousel-heading">
      <div className="idc-shell">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="badge-pill">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Architectural Monograph</span>
            </div>
            <h2 id="featured-carousel-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
              Selected Architectural Commissions
            </h2>
            <p className="font-body text-sm sm:text-base text-[#5e6268] max-w-xl">
              Swipe or browse our recently delivered residences and interior transformations in Bengaluru.
            </p>
          </div>

          {/* Filter Pills & Prev/Next Arrows */}
          <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
            <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1 bg-white rounded-full border border-black/[0.08] shadow-sm max-w-[calc(100vw-110px)] sm:max-w-none">
              {(['All', 'Residential', 'Interiors', 'Commercial'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    activeFilter === cat
                      ? 'bg-[#17181a] text-white shadow-sm'
                      : 'text-[#5e6268] hover:text-[#17181a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={prevSlide}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase Slide */}
        <div
          className="pt-6 sm:pt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredProjects.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-black/[0.06] grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              {/* Left Media Column */}
              <div
                onClick={() => onSelectProject(filteredProjects[currentIndex])}
                className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full bg-[#181a1d] overflow-hidden cursor-pointer group"
              >
                <Image
                  src={filteredProjects[currentIndex].heroImage}
                  alt={filteredProjects[currentIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
                  <span className="badge-pill-dark text-[10px] sm:text-xs">
                    {filteredProjects[currentIndex].category}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-[#17181a] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                    {filteredProjects[currentIndex].area}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 text-[#17181a] text-xs font-semibold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-5 p-5 sm:p-8 lg:p-12 flex flex-col justify-between space-y-5 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#5e6268] font-mono">
                    <span>{filteredProjects[currentIndex].location}</span>
                    <span>0{currentIndex + 1} / 0{totalSlides}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#17181a] font-normal leading-tight">
                    {filteredProjects[currentIndex].title}
                  </h3>

                  <p className="font-body text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    {filteredProjects[currentIndex].subtitle}
                  </p>

                  <p className="font-body text-xs sm:text-sm text-[#5e6268] leading-relaxed">
                    {filteredProjects[currentIndex].clientNarrative}
                  </p>

                  {/* Highlights */}
                  <div className="pt-1 sm:pt-2 space-y-2">
                    <span className="text-[11px] uppercase font-mono font-bold text-[#17181a]/70 block">
                      Architectural Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[#17181a]/80 font-medium">
                      {filteredProjects[currentIndex].keyFeatures?.slice(0, 3).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions & Progress Bar */}
                <div className="pt-4 sm:pt-6 border-t border-black/[0.06] space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                    <button
                      onClick={() => onSelectProject(filteredProjects[currentIndex])}
                      className="btn-primary text-xs py-3 px-5 w-full sm:w-auto justify-center whitespace-nowrap shadow-sm"
                    >
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                    <Link
                      href="/projects"
                      className="btn-outline text-xs py-3 px-5 w-full sm:w-auto justify-center text-center whitespace-nowrap"
                    >
                      <span>All Projects</span>
                    </Link>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center gap-2 pt-1 sm:pt-2">
                    {filteredProjects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === i ? 'w-8 bg-[#c5a059]' : 'w-2 bg-black/15'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
