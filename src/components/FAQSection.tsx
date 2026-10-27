'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do you cater to international clients or NRIs building in Bengaluru?",
      a: "Yes. Over 40% of our residential commissions are for overseas patrons and NRI families residing in the US, UK, Middle East, and Singapore. We provide a full turnkey service including bi-weekly high-definition video walkthroughs, drone aerial progress reports, digital BIM reviews, and transparent financial milestones.",
    },
    {
      q: "What is the typical project scale and budget IDC Architects undertakes?",
      a: "We focus on bespoke single-family residences (typically 3,500 to 15,000+ sq.ft.), luxury penthouses and apartment interior renovations, and boutique commercial workspaces in Bengaluru and South India.",
    },
    {
      q: "Do you handle both architectural design and interior execution?",
      a: "Yes. We believe true architectural clarity occurs when the external structure and internal atmosphere speak the same language. We provide full-scope architectural design, interior architecture, custom joinery documentation, and active site coordination.",
    },
    {
      q: "How does the initial project consultation work?",
      a: "We begin with a structured 45-minute discovery consultation at our T Dasarahalli studio or via Google Meet / Zoom. We review your plot parameters, design aspirations, timeline, and budget parameters before tailoring a comprehensive proposal.",
    },
    {
      q: "What are your fee structures and milestone payment terms?",
      a: "Our architectural fee is structured across defined deliverables: Concept Design (20%), Detailed Working Drawings (35%), Interior Joinery Package (25%), and Site Supervision & Handover (20%). We do not bill hidden percentages.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5] border-t border-black/[0.06]" aria-labelledby="faq-heading">
      <div className="idc-shell">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="badge-pill mx-auto">
            <HelpCircle className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Client Clarifications</span>
          </div>
          <h2 id="faq-heading" className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
            Frequently Answered Questions
          </h2>
          <p className="font-body text-xs sm:text-base text-[#5e6268] leading-relaxed">
            Key information regarding architectural scopes, site feasibility, and NRI turnkey execution.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-black/[0.06] card-shadow overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-7 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-xl md:text-2xl text-[#17181a] font-medium leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 flex items-center justify-center text-[#17181a] shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#17181a] text-white rotate-180' : 'bg-[#fbf9f5]'}`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#5e6268] leading-relaxed font-body border-t border-black/[0.04] pt-3 sm:pt-4 animate-fadeIn">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
