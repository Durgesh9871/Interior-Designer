'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import ContactForm from '@/components/ContactForm';
import FAQSection from '@/components/FAQSection';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export default function StudioPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#fbf9f5] min-h-screen">
      <div className="idc-shell">
        {/* 1. STUDIO INTRODUCTION */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="badge-pill">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Studio & Philosophy</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#17181a] font-normal leading-tight">
            A quiet approach to spatial luxury.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#5e6268] leading-relaxed">
            IDC Architects is an architecture and luxury interior design practice based in Bengaluru. We sculpt bespoke residences, private courtyard estates, and deliberate commercial workspaces focused on climate intelligence, enduring materials, and sensory proportion.
          </p>
        </div>

        {/* 2. PHILOSOPHY & CRAFT TWO-COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-black/[0.08] items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="badge-pill">
              <span>Spatial Principles</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#17181a] font-normal leading-tight">
              Shaped by light, ventilation, and tactile honesty.
            </h2>
            <div className="space-y-4 text-[#5e6268] leading-relaxed text-sm sm:text-base font-body">
              <p>
                In an era dominated by superficial ornament, we turn inward. We view each floor plan as an acoustic and thermal sanctuary—filtering external city intensity through buffer courtyards, deep eaves, and operable timber screens.
              </p>
              <p>
                We do not enforce an arbitrary signature style onto a plot. Instead, every project develops its own tectonic identity from the ground up: the angle of morning sunlight across a living area plinth, the tactile resistance of an aged brass door handle, and the enduring coolness of natural stone under bare feet.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-black/[0.08] text-xs font-mono">
              <div className="p-4 bg-white rounded-xl card-shadow border border-black/[0.06]">
                <span className="text-[#5e6268] uppercase block mb-1">PRACTICE REGION</span>
                <span className="font-semibold text-[#17181a]">Bengaluru & South India</span>
              </div>
              <div className="p-4 bg-white rounded-xl card-shadow border border-black/[0.06]">
                <span className="text-[#5e6268] uppercase block mb-1">DESIGN LANGUAGE</span>
                <span className="font-semibold text-[#17181a]">Tropical Contemporary</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-shadow border border-black/[0.08] group">
              <Image
                src="/images/projects/boutique_commercial_workspace.jpg"
                alt="IDC Architects Creative Atelier & Material Library"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md text-white p-3.5 rounded-xl text-xs flex items-center justify-between font-mono border border-white/10">
                <span>IDC ARCHITECTURAL ATELIER</span>
                <span className="text-[#c5a059] font-bold">BENGALURU</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. STUDIO LEADERSHIP & CREDENTIALS */}
        <div className="py-20 border-b border-black/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="badge-pill mb-2">
                <span>Design Leadership</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#17181a]">
                Principals & Craft Custodians
              </h2>
            </div>
            <span className="badge-pill self-start sm:self-end">
              Verified Practice · T Dasarahalli Studio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl card-shadow border border-black/[0.06] space-y-4">
              <div className="aspect-[4/5] rounded-xl bg-[#f2ece4] flex flex-col items-center justify-center p-6 text-center text-xs text-[#5e6268] space-y-2 relative overflow-hidden">
                <Image
                  src="/images/projects/luxury_residence_exterior.jpg"
                  alt="Principal Architect IDC"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 text-white mt-auto text-left w-full">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">Principal Architect</span>
                  <span className="font-display text-xl font-bold">Design Director</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#17181a]">Bespoke Residential Atelier</h3>
                <p className="text-xs text-[#5e6268] mt-2 leading-relaxed font-body">
                  Over a decade directing contemporary luxury residences, microclimate planning, and interior joinery execution in Bengaluru.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl card-shadow border border-black/[0.06] space-y-4">
              <div className="aspect-[4/5] rounded-xl bg-[#f2ece4] flex flex-col items-center justify-center p-6 text-center text-xs text-[#5e6268] space-y-2 relative overflow-hidden">
                <Image
                  src="/images/projects/interior_living_sanctuary.jpg"
                  alt="Interior Design Studio Lead"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 text-white mt-auto text-left w-full">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">Interior Architecture</span>
                  <span className="font-display text-xl font-bold">Millwork & Lighting Lead</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#17181a]">Interior Architecture Wing</h3>
                <p className="text-xs text-[#5e6268] mt-2 leading-relaxed font-body">
                  Specialising in bespoke stone masonry, custom timber joinery, integrated ambient lighting schedules, and tactile curation.
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#17181a] text-white rounded-2xl card-dark-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="badge-pill-dark">
                  <span>Zero Compromise</span>
                </div>
                <h4 className="font-display text-2xl text-white">Execution Fidelity</h4>
                <p className="text-xs text-white/70 leading-relaxed font-body">
                  In strict accordance with professional integrity guidelines, IDC Architects guarantees turnkey site supervision, transparent procurement schedules, and bi-weekly milestone video audits.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-xs font-mono text-white/80 space-y-1.5 border border-white/10">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>STUDIO CREDENTIALS CONFIRMED</span>
                </div>
                <div>Practice: IDC Architects</div>
                <div>Location: Bengaluru, Karnataka</div>
                <div>Direct Phone: +91 99163 57444</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CONTACT & PROJECT ENQUIRY SECTION */}
        <section id="contact" className="py-20 border-b border-black/[0.08]" aria-labelledby="contact-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="badge-pill mb-2">
                  <span>Direct Project Inquiry</span>
                </div>
                <h2 id="contact-heading" className="font-display text-3xl sm:text-5xl text-[#17181a] font-normal leading-tight">
                  Tell us about the space you’re imagining.
                </h2>
                <p className="font-body text-sm sm:text-base text-[#5e6268] mt-2">
                  Please provide preliminary details regarding your plot location, typology, and timeline. Our studio will review your brief within 24–48 hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-black/[0.06]">
                <ContactForm />
              </div>
            </div>

            {/* Right Column: Confirmed Location & Map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Confirmed Studio Card */}
              <div className="p-8 bg-[#17181a] text-white rounded-2xl card-dark-shadow space-y-6">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#c5a059] block mb-1">
                    Confirmed Studio Office
                  </span>
                  <h3 className="font-display text-2xl text-white">IDC ARCHITECTS</h3>
                </div>

                <div className="space-y-4 text-sm text-white/80 font-body border-t border-white/10 pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono text-white/40 block mb-0.5">STUDIO ADDRESS</span>
                      <p className="leading-relaxed">
                        {siteConfig.address.fullAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono text-white/40 block mb-0.5">TELEPHONE</span>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-base text-white font-semibold hover:text-[#c5a059] transition-colors"
                      >
                        {siteConfig.formattedPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono text-white/40 block mb-0.5">ENQUIRY EMAIL</span>
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-white/90 hover:text-[#c5a059] transition-colors"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono text-white/40 block mb-0.5">CONSULTATION HOURS</span>
                      <p className="text-white/80">Monday – Saturday: 09:30 – 18:30 IST</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action with Rounded Button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full bg-[#1b4d3e] text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Instant WhatsApp Consultation</span>
                  </a>
                  <p className="text-[11px] text-white/40 font-mono text-center mt-2">
                    Direct studio desk: {siteConfig.whatsAppNumber}
                  </p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-black/[0.06]">
                <div className="p-3.5 bg-[#fbf9f5] text-xs font-mono text-[#17181a]/80 flex items-center justify-between border-b border-black/[0.06]">
                  <span>LOCATION MAP · BENGALURU</span>
                  <span>T DASARAHALLI</span>
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <iframe
                    title="IDC Architects Office Map Bengaluru"
                    src="https://maps.google.com/maps?q=T%20Dasarahalli%2C%20S.M.%20Road%2C%20near%20Jalahalli%20Cross%20Road%2C%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.85) contrast(1.1)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />
      </div>
    </div>
  );
}
