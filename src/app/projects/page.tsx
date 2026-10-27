'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, ProjectItem } from '@/data/siteConfig';
import ProjectModal from '@/components/ProjectModal';
import CostEstimator from '@/components/CostEstimator';
import { ArrowUpRight, Filter, Sparkles, Compass } from 'lucide-react';

type FilterCategory = 'All' | 'Residential' | 'Commercial' | 'Interiors';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return siteConfig.projects;
    return siteConfig.projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const getCardLayoutClass = (index: number) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0:
        return 'md:col-span-7 aspect-[16/11]';
      case 1:
        return 'md:col-span-5 aspect-[4/5]';
      case 2:
        return 'md:col-span-5 aspect-[4/4.5]';
      case 3:
        return 'md:col-span-7 aspect-[16/10]';
      default:
        return 'md:col-span-6 aspect-[16/10]';
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#fbf9f5] min-h-screen">
      <div className="idc-shell">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="badge-pill">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Architectural Portfolio</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#17181a] font-normal leading-tight">
            Built around the way life is lived.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#5e6268] leading-relaxed max-w-2xl">
            A curated portfolio of luxury residences, courtyard sanctuaries, and boutique workspaces in Bengaluru. Each commission begins with microclimate intelligence, honest tactile materials, and spatial clarity.
          </p>
        </div>

        {/* Refined Rounded Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-black/[0.08] mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="tablist">
            <Filter className="w-4 h-4 text-[#5e6268] mr-1 shrink-0 hidden sm:block" />
            {(['All', 'Residential', 'Commercial', 'Interiors'] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#17181a] text-white shadow-sm'
                    : 'bg-white text-[#5e6268] hover:text-[#17181a] border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-[#5e6268]">
            SHOWING {filteredProjects.length} OF {siteConfig.projects.length} CURATED PROJECTS
          </div>
        </div>

        {/* Asymmetric Image Grid with Box Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => {
            const layoutClass = getCardLayoutClass(index);
            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#181a1d] cursor-pointer card-shadow border border-black/[0.08] ${layoutClass}`}
              >
                {/* Background Image */}
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top status indicator */}
                <div className="relative z-10 p-5 flex items-start justify-between">
                  <span className="badge-pill-dark">
                    {project.category}
                  </span>
                  <span className="bg-white/95 backdrop-blur-sm text-[#17181a] px-3 py-1 text-[11px] font-mono font-bold rounded-full">
                    {project.area}
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-2 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-xs text-white/80 font-mono tracking-wider">
                    <span>{project.location}</span>
                    <span>·</span>
                    <span className="text-[#c5a059] font-medium">{project.scope}</span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl text-white font-normal leading-tight">
                        {project.title}
                      </h2>
                      <p className="font-body text-xs text-white/70 mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#17181a] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Cost & Feasibility Planning Section on Projects Page */}
        <div className="mt-24 pt-16 border-t border-black/[0.08]">
          <CostEstimator />
        </div>

        {/* Bottom Consultation Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-white card-shadow border border-black/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="badge-pill">Commission Architectural Services</span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#17181a]">
              Ready to discuss your site in Bengaluru?
            </h3>
            <p className="font-body text-sm text-[#5e6268] leading-relaxed">
              Every commission begins with an open dialogue about your site constraints, family routines, light requirements, and material vision.
            </p>
          </div>
          <Link href="/contact" className="btn-primary text-xs py-3 px-7 shrink-0">
            <span>Enquire With Our Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
