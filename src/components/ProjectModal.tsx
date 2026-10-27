'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectItem, siteConfig } from '@/data/siteConfig';
import { X, ArrowUpRight, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const generateWhatsAppInquiry = () => {
    const text = `Hello IDC Architects, I would like to enquire about commissioned work similar to your project: "${project.title}" (${project.category}, ${project.location}).`;
    return encodeURIComponent(text);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl h-full md:h-auto md:max-h-[92vh] bg-white text-[#17181a] overflow-y-auto rounded-none md:rounded-2xl border border-black/10 shadow-2xl flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-black/[0.08]">
          <div className="flex items-center gap-3">
            <span className="badge-pill">{project.category}</span>
            <span className="text-black/20">/</span>
            <span className="text-xs uppercase tracking-wider text-[#5e6268] font-mono">{project.location}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#fbf9f5] hover:bg-[#17181a] hover:text-white flex items-center justify-center text-[#17181a] transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-10 lg:p-12 space-y-6 sm:space-y-10">
          {/* Header Section */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-semibold">
              {project.subtitle}
            </span>
            <h2 id="project-modal-title" className="font-display text-2xl sm:text-5xl tracking-tight leading-tight text-[#17181a]">
              {project.title}
            </h2>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/[0.06] text-xs font-body">
              <div>
                <span className="text-[#5e6268] uppercase tracking-wider block mb-1">Typology</span>
                <span className="font-semibold text-[#17181a]">{project.category}</span>
              </div>
              <div>
                <span className="text-[#5e6268] uppercase tracking-wider block mb-1">Built-Up Area</span>
                <span className="font-semibold text-[#c5a059] font-mono">{project.area}</span>
              </div>
              <div>
                <span className="text-[#5e6268] uppercase tracking-wider block mb-1">Scope</span>
                <span className="font-semibold text-[#17181a]">{project.scope}</span>
              </div>
              <div>
                <span className="text-[#5e6268] uppercase tracking-wider block mb-1">Status</span>
                <span className="font-semibold text-[#17181a]">{project.status}</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-[#181a1d] rounded-xl overflow-hidden border border-black/10 shadow-md">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-mono">
              IDC MONOGRAPH · BENGALURU
            </div>
          </div>

          {/* Narrative & Concept */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-4">
              <span className="badge-pill mb-2">Architectural Intent</span>
              <h3 className="font-display text-2xl font-normal leading-snug text-[#17181a]">
                Proportion, Microclimate & Daylight
              </h3>
            </div>
            <div className="md:col-span-8 space-y-4 text-[#5e6268] leading-relaxed font-body">
              <p className="text-base sm:text-lg font-normal text-[#17181a]">
                {project.clientNarrative}
              </p>
              <p className="text-sm">
                Spatial boundaries are treated not as rigid barriers, but as layered environmental thresholds. Deep overhangs, vertical shading planes, and central lightwells establish a microclimate that remains comfortable through Bengaluru’s seasonal temperature shifts.
              </p>
            </div>
          </div>

          {/* Key Features Checklist */}
          {project.keyFeatures && (
            <div className="border-t border-black/[0.06] pt-8 space-y-4">
              <span className="badge-pill">Architectural Specifications</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="p-4 bg-[#fbf9f5] rounded-xl border border-black/[0.06] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#17181a] font-medium leading-relaxed font-body">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Material Palette Study */}
          <div className="border-t border-black/[0.06] pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="badge-pill">Materiality & Tactile Palette</span>
              <span className="text-xs text-[#5e6268] font-mono">Custom Artisan Finishes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.materialPalette.map((mat, i) => (
                <div key={i} className="p-5 bg-[#fbf9f5] rounded-xl border border-black/[0.06] flex flex-col justify-between">
                  <div>
                    <div
                      className="w-full h-10 rounded-lg mb-3 border border-black/10 shadow-inner"
                      style={{ backgroundColor: mat.colorHex }}
                    />
                    <h4 className="font-display text-xl text-[#17181a] font-medium">{mat.name}</h4>
                  </div>
                  <p className="text-xs text-[#5e6268] mt-2 leading-relaxed font-body">
                    {mat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Gallery Stills */}
          <div className="border-t border-black/[0.06] pt-8 space-y-4">
            <span className="badge-pill">Spatial Perspectives & Craft Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] bg-[#181a1d] rounded-xl overflow-hidden border border-black/10">
                  <Image
                    src={img}
                    alt={`${project.title} perspective ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-mono">
                    View 0{idx + 1} · IDC Curated Study
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Enquiry CTA */}
          <div className="border-t border-black/[0.06] pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 bg-[#f2ece4] rounded-2xl p-4 sm:p-8">
            <div className="space-y-1">
              <span className="badge-pill">Enquire About This Typology</span>
              <h4 className="font-display text-xl sm:text-3xl text-[#17181a] leading-snug">Commission a similar architectural study</h4>
              <p className="text-xs text-[#5e6268] font-body">
                Discuss site dimensions, microclimate design, and turnkey budget parameters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppInquiry()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-3 px-6 w-full sm:w-auto text-center justify-center whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 shrink-0" />
                <span>WhatsApp Brief</span>
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="btn-secondary text-xs py-3 px-6 w-full sm:w-auto text-center justify-center whitespace-nowrap"
              >
                <span>Book Discovery Call</span>
                <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
