'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Building2 } from 'lucide-react';

export default function TestimonialCarousel() {
  const testimonials = [
    {
      id: 1,
      quote: "IDC Architects balanced Bengaluru's intense afternoon sunlight and privacy buffers with surgical precision. The internal water court keeps our entire ground floor naturally cooled without running full-time air conditioning. The execution fidelity matched their initial 3D renders down to the millimeter.",
      clientName: "Vikram & Ananya R.",
      role: "Overseas Villa Owners (Singapore & Bengaluru)",
      project: "Sadashivanagar Tropical Sanctuary",
      area: "6,800 sq.ft. Residential Commission",
      rating: 5,
    },
    {
      id: 2,
      quote: "Living outside India during construction seemed daunting until we engaged IDC Architects. Their bi-weekly HD video walkthroughs, drone aerials, and transparent milestone escrow gave us complete peace of mind. Truly an international-standard studio operating in Bengaluru.",
      clientName: "Dr. K. S. Murthy",
      role: "NRI Healthcare Entrepreneur (London, UK)",
      project: "North Bengaluru Courtyard Estate",
      area: "5,400 sq.ft. Turnkey Architecture & Interiors",
      rating: 5,
    },
    {
      id: 3,
      quote: "Their obsession with tactile materials—from honed kadappa stone to custom brass door hardware—turned our penthouse into an acoustic haven. They managed all contractor coordination, structural alterations, and joinery flawlessly within our target timeline.",
      clientName: "Sanjay & Priya M.",
      role: "Apartment Interior Commission",
      project: "Koramangala Skyline Penthouse",
      area: "4,200 sq.ft. Luxury Interior Architecture",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 sm:py-28 bg-[#f2ece4] border-t border-black/[0.06]" aria-labelledby="testimonials-heading">
      <div className="idc-shell">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-black/[0.08]">
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="badge-pill">
                <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                <span>Client Endorsements & Proof</span>
              </div>
              <div className="flex md:hidden items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-black/10 shadow-sm text-[10px] font-semibold">
                <span className="text-[#c5a059]">★</span>
                <span className="text-[#17181a]">4.9 / 5.0</span>
              </div>
            </div>

            {/* Heading with navigation buttons directly beside it on mobile */}
            <div className="flex items-center justify-between gap-3">
              <h2 id="testimonials-heading" className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
                What Our Patrons Say
              </h2>
              <div className="flex md:hidden items-center gap-1.5 shrink-0">
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="font-body text-xs sm:text-base text-[#5e6268] max-w-xl">
              Verified experiences from Bengaluru villa owners, overseas NRI families, and luxury apartment patrons.
            </p>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 mr-4 bg-white px-3.5 py-1.5 rounded-full border border-black/10 shadow-sm text-xs font-semibold">
              <span className="text-[#c5a059]">★★★★★</span>
              <span className="text-[#17181a]">4.9 / 5.0 Rating</span>
            </div>
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#17181a] hover:bg-[#17181a] hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Card with Ambient Box Shadow */}
        <div className="pt-6 sm:pt-10">
          <div className="bg-white rounded-2xl p-5 sm:p-12 card-shadow border border-black/[0.06] relative max-w-4xl mx-auto">
            <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-[#c5a059]/15 absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none" />

            <div className="flex items-center gap-1 text-amber-500 mb-4 sm:mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="font-display text-base sm:text-2xl lg:text-3xl text-[#17181a] font-normal italic leading-relaxed mb-6 sm:mb-8">
              “{testimonials[currentIndex].quote}”
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-black/[0.06]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#17181a] text-[#c5a059] font-display text-base sm:text-lg font-bold flex items-center justify-center border-2 border-[#c5a059]/40 shadow-sm shrink-0">
                  {testimonials[currentIndex].clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-body text-sm sm:text-base font-bold text-[#17181a]">
                    {testimonials[currentIndex].clientName}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#5e6268]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right sm:border-l sm:pl-6 border-black/[0.08]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c5a059]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{testimonials[currentIndex].project}</span>
                </div>
                <div className="text-[11px] font-mono text-[#5e6268] mt-0.5">
                  {testimonials[currentIndex].area}
                </div>
              </div>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-[#c5a059]' : 'w-2 bg-black/15'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
