'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageCircle, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

export default function HeroScrollScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[Math.max(0, index - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, index + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let renderW = w;
    let renderH = h;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderH = w / imgRatio;
      offsetY = (h - renderH) / 2;
    } else {
      renderW = h * imgRatio;
      offsetX = (w - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Watermark removal: seamless radial gradient patch over bottom-right corner where AI watermark is present
    const patchX = offsetX + renderW * 0.86;
    const patchY = offsetY + renderH * 0.78;
    const patchW = renderW * 0.12;
    const patchH = renderH * 0.14;

    const patchGrad = ctx.createRadialGradient(
      patchX + patchW * 0.5,
      patchY + patchH * 0.5,
      0,
      patchX + patchW * 0.5,
      patchY + patchH * 0.5,
      Math.max(patchW, patchH) * 0.65
    );
    patchGrad.addColorStop(0, 'rgba(10, 13, 17, 0.96)');
    patchGrad.addColorStop(0.5, 'rgba(12, 15, 20, 0.75)');
    patchGrad.addColorStop(1, 'rgba(12, 15, 20, 0)');

    ctx.fillStyle = patchGrad;
    ctx.fillRect(patchX, patchY, patchW, patchH);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameIndex);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load Frame 0 immediately
    const initialFrame = new Image();
    initialFrame.src = '/assets/hero-frames/frame_000.webp';
    initialFrame.onload = () => {
      imagesRef.current[0] = initialFrame;
      drawFrame(0);
    };

    // Load remaining frames progressively
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/assets/hero-frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        imagesRef.current[i] = img;
      };
    }

    // ScrollTrigger across 3 pinned sections
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
        setCurrentFrameIndex(frameIdx);
        drawFrame(frameIdx);

        if (progress < 0.32) {
          setActivePhase(1);
        } else if (progress < 0.7) {
          setActivePhase(2);
        } else {
          setActivePhase(3);
        }
      },
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#0e1013]"
      aria-label="Interactive Architectural Hero"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Hardware-accelerated Canvas for 60fps frame scrubbing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Soft, ultra-subtle atmospheric scrim to let HD video clarity and vibrant colors shine through */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/15" />

        {/* Clean Hero Narrative Overlay — Compact & bottom-weighted on mobile so video is visible */}
        <div className="idc-shell relative z-10 h-full flex flex-col justify-end sm:justify-center pb-12 sm:pb-12 pt-20">
          <div className="max-w-md sm:max-w-xl w-full">
            {/* PHASE 1: ARRIVAL */}
            <div
              className={`backdrop-blur-md bg-black/55 sm:bg-black/45 border border-white/15 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 space-y-2.5 sm:space-y-4 ${
                activePhase === 1
                  ? 'opacity-100 translate-y-0 block'
                  : 'opacity-0 -translate-y-4 hidden'
              }`}
            >
              <div className="badge-pill-dark text-[10px] sm:text-xs py-0.5 sm:py-1 px-2.5 sm:px-3">
                <span>Architecture & Interiors · Bengaluru</span>
              </div>

              {/* H1: 20-22px on phone, 36-40px on desktop */}
              <h1 className="font-display text-xl sm:text-3xl lg:text-[38px] font-normal text-white leading-snug tracking-tight">
                Spaces with presence. Designed for life.
              </h1>

              <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Considered residential and commercial environments shaped by Bengaluru’s tropical microclimate, honest tactile materials, and the rituals of living.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link href="/projects" className="btn-primary text-xs py-2 sm:py-2.5 px-4 sm:px-6">
                  <span>Explore Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/contact" className="btn-ghost-dark text-xs py-2 sm:py-2.5 px-4 sm:px-5 hidden sm:inline-flex">
                  <span>Start a Project</span>
                </Link>
              </div>
            </div>

            {/* PHASE 2: THRESHOLD */}
            <div
              className={`backdrop-blur-md bg-black/55 sm:bg-black/45 border border-white/15 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 space-y-2.5 sm:space-y-4 ${
                activePhase === 2
                  ? 'opacity-100 translate-y-0 block'
                  : 'opacity-0 -translate-y-4 hidden'
              }`}
            >
              <div className="badge-pill-dark text-[10px] sm:text-xs py-0.5 sm:py-1 px-2.5 sm:px-3">
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Microclimate Transition</span>
              </div>

              <h2 className="font-display text-xl sm:text-3xl lg:text-[38px] font-normal text-white leading-snug tracking-tight">
                From city intensity to spatial sanctuary.
              </h2>

              <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Deep overhangs, basalt plinths, and bespoke vertical teak screens buffer tropical solar heat while framing introspective rain gardens.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link href="/projects" className="btn-primary text-xs py-2 sm:py-2.5 px-4 sm:px-6">
                  <span>View Luxury Residences</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* PHASE 3: INTERIOR SANCTUARY */}
            <div
              className={`backdrop-blur-md bg-black/55 sm:bg-black/45 border border-white/15 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 space-y-2.5 sm:space-y-4 ${
                activePhase === 3
                  ? 'opacity-100 translate-y-0 block'
                  : 'opacity-0 -translate-y-4 hidden'
              }`}
            >
              <div className="badge-pill-dark text-[10px] sm:text-xs py-0.5 sm:py-1 px-2.5 sm:px-3">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Double-Height Living Sanctuary</span>
              </div>

              <h2 className="font-display text-xl sm:text-3xl lg:text-[38px] font-normal text-white leading-snug tracking-tight">
                Calm in proportions, generous in details.
              </h2>

              <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Seamless sliding glass envelopes, honed travertine plinths, and slatted ceilings connect daily life with natural reflection courts.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link href="/contact" className="btn-primary text-xs py-2 sm:py-2.5 px-4 sm:px-6">
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-dark text-xs py-2 sm:py-2.5 px-3.5 sm:px-5 hidden sm:inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Studio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Right Luxury Monograph Badge (Laptop/Desktop) — covers watermark with signature studio tag */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase font-semibold">
              IDC ARCHITECTURAL MONOGRAPH
            </span>
            <span className="text-[9px] font-mono text-white/50 tracking-wider uppercase">
              4K SPATIAL CINEMATOGRAPHY · BENGALURU
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
