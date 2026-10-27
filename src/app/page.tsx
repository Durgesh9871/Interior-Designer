'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, ProjectItem } from '@/data/siteConfig';
import HeroScrollScrubber from '@/components/HeroScrollScrubber';
import TrustMetricsStrip from '@/components/TrustMetricsStrip';
import InteractiveHouse3D from '@/components/InteractiveHouse3D';
import TransformationSlider from '@/components/TransformationSlider';
import ProjectCarousel from '@/components/ProjectCarousel';
import ServicesGrid from '@/components/ServicesGrid';
import CostEstimator from '@/components/CostEstimator';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import FAQSection from '@/components/FAQSection';
import ProjectModal from '@/components/ProjectModal';
import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      {/* 1. HERO SECTION WITH 192-FRAME SCROLL SCRUBBING & CLEAN 36–40PX HEADING */}
      <HeroScrollScrubber />

      {/* 2. TRUST METRICS STRIP */}
      <TrustMetricsStrip />

      {/* 3. STUDIO POINT OF VIEW (NARRATIVE PHILOSOPHY & CRAFT) */}
      <section className="py-24 sm:py-32 bg-[#fbf9f5]" aria-labelledby="pov-heading">
        <div className="idc-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="badge-pill">
                <span>Studio Point of View</span>
              </div>

              <h2 id="pov-heading" className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-[1.15] tracking-tight">
                “A room should feel inevitable—calm in its proportions, generous in its details.”
              </h2>

              <div className="space-y-4 text-[#5e6268] text-xs sm:text-base leading-relaxed font-body">
                <p>
                  Architecture in Bengaluru cannot be divorced from its tropical microclimate, sudden afternoon cloudbursts, and evolving urban fabric. We prioritize deep overhangs, cross-ventilated living courts, and honest geological materials over fleeting cosmetic trends.
                </p>
                <p>
                  Every residence is treated as an acoustic haven from city intensity—incorporating basalt reflection plinths that cool naturally at dusk, and porous limestone screens that filter intense tropical sun.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/studio" className="btn-secondary text-xs py-3 px-6 w-full sm:w-auto text-center justify-center">
                  <span>Explore Studio Philosophy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/contact" className="btn-outline text-xs py-3 px-6 w-full sm:w-auto text-center justify-center">
                  <span>Discuss Your Plot</span>
                </Link>
              </div>
            </div>

            {/* Right Photo Reveal with Box Shadow */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-shadow border border-black/[0.08] group">
                <Image
                  src="/images/projects/interior_living_sanctuary.jpg"
                  alt="IDC Architects Interior Study - Double-height living court and travertine plinth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md text-white p-3.5 rounded-xl text-xs flex items-center justify-between font-mono border border-white/10">
                  <span>INTERIOR SPATIAL SANCTUARY</span>
                  <span className="text-[#c5a059] font-bold">BENGALURU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 3D ARCHITECTURAL HOUSE (FULL MOUSE & TOUCH 360° EXPLORATION & LAYER CONFIGURATOR) */}
      <InteractiveHouse3D />

      {/* 5. INTERACTIVE FEATURED PROJECT CAROUSEL */}
      <ProjectCarousel onSelectProject={(p) => setSelectedProject(p)} />

      {/* 6. INTERACTIVE BEFORE & AFTER TRANSFORMATION SLIDER */}
      <TransformationSlider />

      {/* 7. ARCHITECTURAL SERVICES GRID WITH BOX SHADOWS & HOVER ELEVATION */}
      <ServicesGrid />

      {/* 8. INTERACTIVE ARCHITECTURAL COST & FEASIBILITY ESTIMATOR */}
      <section className="py-20 sm:py-28 bg-[#f2ece4] border-t border-black/[0.06]" aria-labelledby="calculator-heading">
        <div className="idc-shell">
          <CostEstimator />
        </div>
      </section>

      {/* 9. CLIENT TESTIMONIALS CAROUSEL */}
      <TestimonialCarousel />

      {/* 12. FAQ ACCORDION */}
      <FAQSection />

      {/* 13. FINAL HIGH-CONVERTING LUXURY CONSULTATION CTA */}
      <section className="relative min-h-[60vh] flex items-center bg-[#0e1013] text-white overflow-hidden py-20" aria-label="Project Consultation">
        <Image
          src="/images/projects/luxury_residence_exterior.jpg"
          alt="IDC Architects Bengaluru Luxury Residence"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-[#0e1013]/85 to-transparent pointer-events-none" />

        <div className="idc-shell relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="badge-pill-dark">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Begin Your Architectural Journey</span>
            </div>

            <h2 className="font-display text-2xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Begin with an architectural conversation.
            </h2>

            <p className="font-body text-white/80 text-xs sm:text-base leading-relaxed max-w-xl">
              Share your location, plot size, and design aspirations. Our principal architects will review your brief within 24–48 hours to schedule an initial discovery consultation.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/contact"
                className="btn-primary text-xs py-3 px-7 w-full sm:w-auto text-center justify-center whitespace-nowrap"
              >
                <span>Book Studio Discovery Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark text-xs py-3 px-6 flex items-center justify-center gap-2 hover:border-emerald-400 hover:text-emerald-300 w-full sm:w-auto text-center whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/60 font-mono flex flex-wrap gap-x-6 gap-y-2">
              <span>CONFIRMED STUDIO: {siteConfig.formattedPhone}</span>
              <span>·</span>
              <span>T DASARAHALLI, S.M. ROAD, BENGALURU</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
